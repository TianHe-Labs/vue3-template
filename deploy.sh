pnpm run build
# if [ ! -d /var/www/vue-template ];then mkdir /var/www/vue-template;el
if [[ -n $(ls /var/www/vue-template) ]];then rm -r /var/www/vue-template;fi
cp -r ./dist /var/www/vue-template
#scp -r dist ubuntu@10.245.146.155:/var/www/vue-template
nginx -s reload
