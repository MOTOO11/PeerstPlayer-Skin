function init() {
        var elm;
 
        // �����N�쐬
        elm = document.getElementById("boardname");
        if (elm) {
                var url = "http://jbbs.shitaraba.net/bbs/read.cgi/radio/20184/1388213554/";
                if (url.match(/(https?:\/\/[\x21-\x3B\x3D\x3F-\x7E]+?\/).*?\/read\.cgi\/(.*?\/.*?\/)/)) {
                        // THREADURL����URL�𐶐�
                        var link = RegExp.$1 + RegExp.$2;
                        elm.href = link;
                }
        }
 
        // h���������N�쐬
        var re = new RegExp('([^h])(ttps?://[\x21-\x3B\x3D\x3F-\x7E]+)', "ig");
        var replace = '$1<a href="h$2">$2</a>';
        document.body.innerHTML = document.body.innerHTML.replace(re, replace);
 
        // ���X�|�b�v�A�b�v�ύX
        elm = document.getElementsByTagName('A');
        for (var cnt=0; cnt<elm.length; cnt++) {
                var l = elm[cnt].href;
 
                if (l.match(/\/read\.cgi\/.*\/(\d+)$/)) {
                        var no = RegExp.$1;
                        elm[cnt].href = "javascript:void(0);";
                        elm[cnt].target = "";
                        elm[cnt].onclick = new Function("showPopup(this, '" + no + "');");
                }
        }
}
 
function removePopup(obj) {
        obj.parentNode.removeChild(obj);
}
 
function showPopup(objA, resno) {
        var idPopup = 'popup' + resno;
        if (document.getElementById(idPopup)) return;   // ��d�\���h�~
 
        // �̈�쐬
        var elm = document.createElement('div');
        elm.className = 'popup';
        elm.id = idPopup;
 
        // ����
        var objClose = document.createElement('a');
        objClose.onclick = new Function("removePopup(this.parentNode);");
        objClose.href = "javascript:void(0);";
        objClose.innerHTML = "����";
        elm.appendChild(objClose);
        elm.appendChild(document.createElement('br'));
 
        var ary = resno.split(',');
        for(var cnt=0; cnt<ary.length; cnt++) {
                // �A���J�[�͈͎w��
                var ary2 = ary[cnt].split('-');
                var from = ary2[0];
                var to = ary2[1];
                if (ary2.length == 1) {
                        to = from;
                }
                for(var cnt2=from; cnt2<=to; cnt2++) {
                        // ����������
                        var div1 = document.createElement('div');
                        var div2 = document.createElement('div');
                        div1.innerHTML = document.getElementsByTagName('dt')[resno-1].innerHTML;
                        div2.innerHTML = document.getElementsByTagName('dd')[resno-1].innerHTML;
 
                        elm.appendChild(div1);
                        elm.appendChild(div2);
                }
        }
 
        var objTarget = objA.parentNode;
        objTarget.insertBefore(elm, objTarget.firstChild);
}