pnpm run build
if [ ! -d /var/www/squint ];then mkdir /var/www/squint;elif [[ -n $(ls /var/www/squint) ]];then rm -r /var/www/squint/*;fi
cp -r ./dist/* /var/www/squint/
nginx -s reload
