pnpm run build
if [ ! -d /var/www/vue-template ];then mkdir /var/www/vue-template;elif [[ -n $(ls /var/www/vue-template) ]];then rm -r /var/www/vue-template/*;fi
cp -r ./dist/* /var/www/vue-template/
#scp -r dist/* root@39.101.151.195:/var/www/vue-template/
nginx -s reload
