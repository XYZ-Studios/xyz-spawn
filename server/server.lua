XYZ = exports['qb-core']:GetCoreObject()

AddEventHandler('onResourceStart', function(resource)
   if resource == GetCurrentResourceName() then
      print('====================================')
      print('           xyz_spawnmenu 1.0.4      ')
      print('====================================')
   end
end)

---@param cid string
---@return table?
lib.callback.register('qb-spawn:server:getOwnedHouses', function(_, cid)
   if cid ~= nil then
      local houses = MySQL.query.await('SELECT * FROM properties WHERE owner_citizenid = ?', {cid})
       if houses[1] ~= nil then
           return houses
       end
   end
end)

lib.callback.register('xyz_spawn:GetOwnedApartment', function(source, cid)
   local Player = XYZ.Functions.GetPlayer(source)
   local result = MySQL.query.await('SELECT * FROM properties WHERE owner_citizenid = ?', { cid })

   if not cid then
       cid = Player.PlayerData.citizenid
   end

   if result[1] then
      lib.print.info('XYZ-Spawn: Player ' .. cid .. ' has ' .. #result .. ' apartments')
       return result[1]
   end
end)

lib.callback.register('xyz_spawnmenu:server:updateUI', function(source)
   local Player = XYZ.Functions.GetPlayer(source)
   local userinfo = {
       name = Player.PlayerData.charinfo.firstname .. ' ' .. Player.PlayerData.charinfo.lastname,
       job = Player.PlayerData.job.label,
   }
   return userinfo
end)