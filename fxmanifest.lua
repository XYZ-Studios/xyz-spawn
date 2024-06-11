fx_version "cerulean"
games {"gta5",}

description "XYZ - Spawn Selection"
author "MoneSuper"
version '1.0.0'

ui_page 'web/build/index.html'

shared_script {
    '@ox_lib/init.lua',
}

client_script {
	"client/**/*",
}

server_script {
	"server/**/*",
	'@oxmysql/lib/MySQL.lua',
}


files {
	'web/build/index.html',
	'web/build/**/*',
	'locales/en.json',
}

-- escrow_ignore {
-- 	'shared/shared.lua',
-- 	'locales/en.json',
--   }

lua54 'yes'