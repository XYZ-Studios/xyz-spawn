local Core = exports['qb-core']:GetCoreObject() lib.locale()

local function toggleNuiFrame(shouldShow)
    local userinfo = lib.callback.await('xyz_spawnmenu:server:updateUI', false, source)
    SetNuiFocus(shouldShow, shouldShow)
    SendReactMessage('setVisible', shouldShow)
    SendReactMessage('userinfo', userinfo)
end


RegisterNetEvent('apartments:client:setupSpawnUI', function(cData , new)
    TriggerEvent('xyz-weather:client:SpawnMenu', source)
    local result = lib.callback.await('xyz_spawn:GetOwnedApartment', false, cData.citizenid)
    TriggerScreenblurFadeIn(500)
    if result then
        SwitchOutPlayer(cache.ped, 0, 1)
        while GetPlayerSwitchState() ~= 5 do Wait(0) end
        DoScreenFadeIn(1000)
        toggleNuiFrame(true)
        SendReactMessage('IsNew', false)
    else
        SwitchOutPlayer(cache.ped, 0, 1)
        while GetPlayerSwitchState() ~= 5 do Wait(0) end
        DoScreenFadeIn(1000)
        toggleNuiFrame(true)
        SendReactMessage('IsNew', true)
    end
end)


RegisterNetEvent('qb-spawn:client:openUI', function(value)
    SetNuiFocus(true, true)
    SetEntityVisible(cache.ped, false)
    DoScreenFadeOut(250)
    while GetPlayerSwitchState() ~= 5 do Wait(0) end
    DoScreenFadeIn(1000)
    Core.Functions.GetPlayerData(function(PlayerData)end)
    Wait(500)
    TriggerEvent('apartments:client:setupSpawnUI')
    toggleNuiFrame(true)
    TriggerEvent('xyz-weather:client:EnableSync', src)
end)

RegisterNUICallback('hideFrame', function(_, cb)
    SetNuiFocus(false, false)
    toggleNuiFrame(false)
    cb('ok')
end)

RegisterNUICallback('forge-spawn', function(data, cb)
    local index = tonumber(data.index)
    local ped = cache.ped
    local spawnLocation = vector4(data.coords.x, data.coords.y, data.coords.z, data.coords.h)

    toggleNuiFrame(false)
    TriggerScreenblurFadeOut(0)
    spawnPlayer(spawnLocation)

    cb('ok')
end)


RegisterNUICallback('forge-navbar', function(data, cb)
    PlaySoundFrontend(-1, "SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET", 1)
    cb('ok')
end)

RegisterNUICallback('logout', function(data, cb)
    cb('ok')
end)

RegisterNUICallback('forge-introplayer', function(data, cData, new, cb)
    local ped = cache.ped
    toggleNuiFrame(false)

    DoScreenFadeOut(0)

    SwitchInPlayer(ped)

    while GetPlayerSwitchState() ~= 12 do Wait(0) end

    CreateCam(source)
end)

function spawnPlayer(spawnLocation)
    local ped = cache.ped

    SetEntityVisible(cache.ped, true)
    RequestCollisionAtCoord(spawnLocation.x, spawnLocation.y, spawnLocation.z)
    SetEntityCoordsNoOffset(ped, spawnLocation.x, spawnLocation.y, spawnLocation.z, false, false, false, true)
    SetEntityHeading(ped, spawnLocation.h)
    FreezeEntityPosition(ped, true)

    SetGameplayCamRelativeHeading(0)

    while GetPlayerSwitchState() ~= 5 do Wait(0) end

    SwitchInPlayer(ped)

    while GetPlayerSwitchState() ~= 12 do Wait(0) end

    while not HasCollisionLoadedAroundEntity(ped) do Wait(0) end
    SetEntityCoordsNoOffset(ped, spawnLocation.x, spawnLocation.y, spawnLocation.z, false, false, false, true)

	FreezeEntityPosition(ped, false)

    TriggerServerEvent('ps-housing:server:resetMetaData')
    TriggerEvent('xyz-weather:client:EnableSync')
    TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
    TriggerEvent('QBCore:Client:OnPlayerLoaded')
end

RegisterNUICallback('lastlocation', function(data, cb)
    TriggerScreenblurFadeOut(0)
    local PlayerData = Core.Functions.GetPlayerData()
    local insideMeta = PlayerData.metadata["inside"]

    -- xSound:Destroy('intro')
    toggleNuiFrame(false)

    Core.Functions.GetPlayerData(function(pd)
        ped = cache.ped

        SetEntityVisible(cache.ped, true)
        RequestCollisionAtCoord(pd.position.x, pd.position.y, pd.position.z, - 1.0)
        SetEntityCoords(ped, pd.position.x, pd.position.y, pd.position.z - 2.0)
        SetEntityHeading(ped, pd.position.a)

        FreezeEntityPosition(ped, true)
        SetGameplayCamRelativeHeading(0)

        while GetPlayerSwitchState() ~= 5 do Wait(0) end

        SwitchInPlayer(ped)

        while GetPlayerSwitchState() ~= 12 do Wait(0) end

        while not HasCollisionLoadedAroundEntity(ped) do Wait(0) end


        local dict = "anim@scripted@heist@ig25_beach@male@"
        RequestAnimDict(dict)
        repeat Wait(0) until HasAnimDictLoaded(dict)

        local playerPed = PlayerPedId()
        local playerPos = GetEntityCoords(playerPed)
        local playerHead = GetEntityHeading(playerPed)

        local scene = NetworkCreateSynchronisedScene(playerPos.x, playerPos.y, playerPos.z, 0.0, 0.0, playerHead, 2, false, false, 8.0, 1000.0, 1.0)
        NetworkAddPedToSynchronisedScene(playerPed, scene, dict, "action", 1000.0, 8.0, 0, 0, 1000.0, 8192)
        NetworkAddSynchronisedSceneCamera(scene, dict, "action_camera")
        NetworkStartSynchronisedScene(scene)

        Wait(GetAnimDuration(dict, "action") * 1000)

        FreezeEntityPosition(ped, false)

        if insideMeta.property_id ~= nil then
            local property_id = insideMeta.property_id
            TriggerServerEvent('ps-housing:server:enterProperty', tostring(property_id))
        else
            TriggerServerEvent('ps-housing:server:resetMetaData')
        end

        TriggerServerEvent('QBCore:Server:OnPlayerLoaded')
        TriggerEvent('QBCore:Client:OnPlayerLoaded')
        TriggerEvent('xyz-weather:client:EnableSync')
    end)
    cb('ok')
end)