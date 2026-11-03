/* Ka'Mello Escape: customer on-screen notifications (prototype data, read state kept in localStorage) */
(function(){
var N=[
 {id:'n7',type:'payment',when:'Oct 30, 2026 · 8:00 AM',ago:'Today',t:'Payment due today',d:'Installment 2 of $1,000 for Eastern Caribbean 7-Night Cruise (KE-2026-0142) is due today.',href:'Portal-Pay.html?b=0142',cta:'Pay now',tone:'due'},
 {id:'n6',type:'payment',when:'Oct 30, 2026 · 8:00 AM',ago:'Today',t:'Next payment for your Orlando trip',d:'Installment 1 of $600 for Orlando Family Theme Park Week (KE-2026-0163) is due Nov 15, 2026.',href:'Portal-BookingDetails-0163.html',cta:'View schedule',tone:'info'},
 {id:'n5',type:'payment',when:'Oct 27, 2026 · 8:00 AM',ago:'3 days ago',t:'Payment due in 3 days',d:'Installment 2 of $1,000 for KE-2026-0142 is due Oct 30, 2026.',href:'Portal-Pay.html?b=0142',cta:'Pay now',tone:'info'},
 {id:'n4',type:'payment',when:'Oct 15, 2026 · 6:12 PM',ago:'Oct 15',t:'Payment received: $1,200',d:'Initial deposit for Orlando Family Theme Park Week (KE-2026-0163). Receipt RCP-2026-0016.',href:'Portal-History.html?b=KE-2026-0163',cta:'View payment',tone:'ok'},
 {id:'n3',type:'booking',when:'Oct 15, 2026 · 6:13 PM',ago:'Oct 15',t:'Booking confirmed',d:'Orlando Family Theme Park Week, Jul 10 – Jul 17, 2027 for 4 travellers is confirmed.',href:'Portal-BookingDetails-0163.html',cta:'View booking',tone:'ok'},
 {id:'n2',type:'document',when:'Oct 12, 2026 · 11:20 AM',ago:'Oct 12',t:'New document: Travel itinerary',d:'Your agent added the travel itinerary for Eastern Caribbean 7-Night Cruise (KE-2026-0142).',href:'Portal-Documents.html',cta:'Open documents',tone:'info'},
 {id:'n1',type:'payment',when:'Sep 30, 2026 · 10:44 AM',ago:'Sep 30',t:'Payment received: $1,000',d:'Installment 1 for KE-2026-0142. Receipt RCP-2026-0010.',href:'Portal-Receipt.html',cta:'View receipt',tone:'ok'}
];
var DEFAULT_READ=['n4','n3','n2','n1'], KEY='ke_notif_read';
function readSet(){try{var v=JSON.parse(localStorage.getItem(KEY));if(Array.isArray(v))return v}catch(e){}return DEFAULT_READ.slice()}
function save(a){localStorage.setItem(KEY,JSON.stringify(a))}
function isRead(n){return readSet().indexOf(n.id)>-1}
function mark(id){var a=readSet();if(a.indexOf(id)<0){a.push(id);save(a)}}
function markAll(){save(N.map(function(n){return n.id}))}
function unread(){return N.filter(function(n){return !isRead(n)}).length}
var ICON={payment:'<path d="M3 7h18v10H3z"/><path d="M3 11h18"/><path d="M7 15h3"/>',document:'<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/>',booking:'<path d="M3 11l18-8-8 18-2-8z"/>'};
var TONE={due:['#FFF4D6','#8A6100'],ok:['#E3F1F1','#0A6E75'],info:['#EEF2F3','#2C4650']};
function ico(n){var c=TONE[n.tone]||TONE.info;return '<span class="nt-ico" style="background:'+c[0]+';color:'+c[1]+'"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICON[n.type]+'</svg></span>'}
function item(n,full){var r=isRead(n);return '<a class="nt-item'+(r?'':' unread')+'" href="'+n.href+'" data-id="'+n.id+'">'+ico(n)+'<span class="nt-body"><span class="nt-t">'+n.t+'</span><span class="nt-d">'+n.d+'</span><span class="nt-w">'+(full?n.when:n.ago)+(full?' · <span class="nt-cta">'+n.cta+' →</span>':'')+'</span></span>'+(r?'':'<span class="nt-dot" aria-label="Unread"></span>')+'</a>'}
var css='.nt{position:relative;flex:none}.nt>summary{list-style:none;cursor:pointer;width:42px;height:42px;border-radius:50%;display:grid;place-items:center;color:#C9DBDE;border:1px solid transparent;position:relative}.nt>summary::-webkit-details-marker{display:none}.nt>summary:hover,.nt[open]>summary{color:#fff;background:#123845;border-color:#2C5563}'+
'.nt-badge{position:absolute;top:4px;right:3px;min-width:18px;height:18px;padding:0 5px;box-sizing:border-box;border-radius:9px;background:#E5484D;color:#fff;font-size:11px;font-weight:700;display:grid;place-items:center;border:2px solid #0C2B36}'+
'.nt-panel{position:absolute;right:-60px;top:calc(100% + 8px);width:380px;max-width:calc(100vw - 24px);background:#fff;border-radius:12px;box-shadow:0 14px 40px rgba(12,43,54,.25);overflow:hidden;z-index:30}'+
'.nt-head{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid #E8EEEE}.nt-head b{font-size:15.5px;color:#14323C}.nt-head button,.nt-link{background:none;border:0;color:#0A6E75;font:inherit;font-size:13.5px;font-weight:600;cursor:pointer;padding:0;text-decoration:none}'+
'.nt-list{max-height:420px;overflow:auto}.nt-item{display:flex;gap:12px;align-items:flex-start;padding:12px 16px;text-decoration:none;color:#14323C;border-bottom:1px solid #F0F4F4;position:relative}.nt-item:hover{background:#F6F9F9;color:#14323C}.nt-item.unread{background:#F4FAFA}'+
'.nt-ico{flex:none;width:36px;height:36px;border-radius:50%;display:grid;place-items:center}.nt-body{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}.nt-t{font-weight:600;font-size:14.5px}.nt-item:not(.unread) .nt-t{font-weight:500}.nt-d{font-size:13.5px;color:#4B626C;line-height:1.4}.nt-w{font-size:12.5px;color:#6B7F86;margin-top:2px}.nt-cta{color:#0A6E75;font-weight:600}'+
'.nt-dot{flex:none;width:9px;height:9px;border-radius:50%;background:#0A6E75;margin-top:6px}.nt-foot{display:block;text-align:center;padding:12px;font-size:14px;font-weight:600;color:#0A6E75;text-decoration:none;background:#FAFCFC}.nt-foot:hover{background:#F1F6F6}'+
'.nt-empty{padding:28px 16px;text-align:center;color:#4B626C;font-size:14px}'+
'.ntp-tabs{display:flex;flex-wrap:wrap;gap:6px}.ntp-tabs button{min-height:38px;padding:0 14px;border-radius:999px;border:1px solid #C3D0D3;background:#fff;color:#14323C;font:inherit;font-size:14px;font-weight:600;cursor:pointer}.ntp-tabs button[aria-pressed="true"]{background:#0C2B36;border-color:#0C2B36;color:#fff}'+
'.ntp-card{background:#fff;border:1px solid #D3DEDF;border-radius:8px;overflow:hidden}.ntp-card .nt-item{padding:16px 20px}.ntp-card .nt-item:last-child{border-bottom:0}'+
'@media (max-width:900px){.nt{margin-left:auto}.nt-panel{right:-50px}}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
// bell in header
var user=document.querySelector('.kh-user');
if(user){
 var d=document.createElement('details');d.className='nt';
 user.parentNode.insertBefore(d,user); if(window.matchMedia('(max-width:900px)').matches)user.style.marginLeft='0';
 function drawBell(){var u=unread();
  d.innerHTML='<summary aria-label="Notifications'+(u?', '+u+' unread':'')+'"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>'+(u?'<span class="nt-badge">'+u+'</span>':'')+'</summary>'+
  '<div class="nt-panel" role="dialog" aria-label="Notifications"><div class="nt-head"><b>Notifications</b>'+(u?'<button type="button" id="nt-all">Mark all as read</button>':'')+'</div><div class="nt-list">'+N.slice(0,5).map(function(n){return item(n,false)}).join('')+'</div><a class="nt-foot" href="Portal-Notifications.html">View all notifications</a></div>';
  var b=d.querySelector('#nt-all');if(b)b.onclick=function(e){e.preventDefault();markAll();var o=d.open;drawBell();d.open=o;render();};
 }
 drawBell(); window.KE_drawBell=drawBell;
 document.addEventListener('click',function(e){if(d.open&&!d.contains(e.target))d.open=false;var u=document.querySelector('.kh-user');if(u&&u.open&&d.contains(e.target))u.open=false;});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&d.open){d.open=false;d.querySelector('summary').focus()}});
}
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('.nt-item');if(a)mark(a.dataset.id)});
// full page
var root=document.getElementById('ntp-root'), filter='all';
function render(){ if(!root)return; var u=unread();
 var L=N.filter(function(n){return filter==='all'||(filter==='unread'?!isRead(n):n.type===filter)});
 var T=[['all','All'],['unread','Unread'+(u?' ('+u+')':'')],['payment','Payments'],['document','Documents'],['booking','Bookings']];
 root.innerHTML='<div class="ap-row" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px"><div class="ntp-tabs" role="group" aria-label="Filter">'+T.map(function(x){return '<button type="button" data-f="'+x[0]+'" aria-pressed="'+(filter===x[0])+'">'+x[1]+'</button>'}).join('')+'</div>'+(u?'<button type="button" class="nt-link" id="ntp-all" style="font-size:14.5px">Mark all as read</button>':'<span style="color:#4B626C;font-size:14px">You are all caught up</span>')+'</div>'+
 '<div class="ntp-card">'+(L.length?L.map(function(n){return item(n,true)}).join(''):'<div class="nt-empty">No notifications here.</div>')+'</div>';
 root.querySelectorAll('[data-f]').forEach(function(b){b.onclick=function(){filter=b.dataset.f;render()}});
 var m=document.getElementById('ntp-all');if(m)m.onclick=function(){markAll();render();if(window.KE_drawBell)KE_drawBell();};
}
render();
})();
