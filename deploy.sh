pnpm run build
if [ ! -d /var/www/xxxx ];then mkdir /var/www/xxxx;elif [[ -n $(ls /var/www/xxxx) ]];then rm -r /var/www/xxxx/*;fi
cp -r ./dist/* /var/www/xxxx/
#scp -r dist/* root@39.101.151.195:/var/www/xxxx/
nginx -s reload
