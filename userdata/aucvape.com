--- 
customlog: 
  - 
    format: combined
    target: /etc/apache2/logs/domlogs/aucvape.com
  - 
    format: "\"%{%s}t %I .\\n%{%s}t %O .\""
    target: /etc/apache2/logs/domlogs/aucvape.com-bytes_log
documentroot: /home/gjq4bqkro9y9/public_html
group: gjq4bqkro9y9
hascgi: 1
homedir: /home/gjq4bqkro9y9
ip: 92.205.3.41
owner: gdresell
phpopenbasedirprotect: 1
port: 80
scriptalias: 
  - 
    path: /home/gjq4bqkro9y9/public_html/cgi-bin
    url: /cgi-bin/
serveradmin: webmaster@aucvape.com
serveralias: mail.aucvape.com www.aucvape.com
servername: aucvape.com
ssl_redirect: ''
usecanonicalname: 'Off'
user: gjq4bqkro9y9
