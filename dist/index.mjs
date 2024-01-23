function t(t,i,r,a,h){n(t,i,r||0,a||t.length-1,h||e)}function n(t,e,r,a,h){for(;a>r;){if(a-r>600){var o=a-r+1,s=e-r+1,l=Math.log(o),u=.5*Math.exp(2*l/3),c=.5*Math.sqrt(l*u*(o-u)/o)*(s-o/2<0?-1:1);n(t,e,Math.max(r,Math.floor(e-s*u/o+c)),Math.min(a,Math.floor(e+(o-s)*u/o+c)),h)}var m=t[e],f=r,x=a;for(i(t,r,e),h(t[a],m)>0&&i(t,r,a);f<x;){for(i(t,f,x),f++,x--;h(t[f],m)<0;)f++;for(;h(t[x],m)>0;)x--}0===h(t[r],m)?i(t,r,x):i(t,++x,a),x<=e&&(r=x+1),e<=x&&(a=x-1)}}function i(t,n,i){var e=t[n];t[n]=t[i],t[i]=e}function e(t,n){return t<n?-1:t>n?1:0}class r{constructor(t=9){this._maxEntries=Math.max(4,t),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()}all(){return this._all(this.data,[])}search(t){let n=this.data;const i=[];if(!p(t,n))return i;const e=this.toBBox,r=[];for(;n;){for(let a=0;a<n.children.length;a++){const h=n.children[a],o=n.leaf?e(h):h;p(t,o)&&(n.leaf?i.push(h):x(t,o)?this._all(h,i):r.push(h))}n=r.pop()}return i}collides(t){let n=this.data;if(!p(t,n))return!1;const i=[];for(;n;){for(let e=0;e<n.children.length;e++){const r=n.children[e],a=n.leaf?this.toBBox(r):r;if(p(t,a)){if(n.leaf||x(t,a))return!0;i.push(r)}}n=i.pop()}return!1}load(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(let n=0;n<t.length;n++)this.insert(t[n]);return this}let n=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===n.height)this._splitRoot(this.data,n);else{if(this.data.height<n.height){const t=this.data;this.data=n,n=t}this._insert(n,this.data.height-n.height-1,!0)}else this.data=n;return this}insert(t){return t&&this._insert(t,this.data.height-1),this}clear(){return this.data=d([]),this}remove(t,n){if(!t)return this;let i=this.data;const e=this.toBBox(t),r=[],h=[];let o,s,l;for(;i||r.length;){if(i||(i=r.pop(),s=r[r.length-1],o=h.pop(),l=!0),i.leaf){const e=a(t,i.children,n);if(-1!==e)return i.children.splice(e,1),r.push(i),this._condense(r),this}l||i.leaf||!x(i,e)?s?(o++,i=s.children[o],l=!1):i=null:(r.push(i),h.push(o),o=0,s=i,i=i.children[0])}return this}toBBox(t){return t}compareMinX(t,n){return t.minX-n.minX}compareMinY(t,n){return t.minY-n.minY}toJSON(){return this.data}fromJSON(t){return this.data=t,this}_all(t,n){const i=[];for(;t;)t.leaf?n.push(...t.children):i.push(...t.children),t=i.pop();return n}_build(t,n,i,e){const r=i-n+1;let a,o=this._maxEntries;if(r<=o)return a=d(t.slice(n,i+1)),h(a,this.toBBox),a;e||(e=Math.ceil(Math.log(r)/Math.log(o)),o=Math.ceil(r/Math.pow(o,e-1))),a=d([]),a.leaf=!1,a.height=e;const s=Math.ceil(r/o),l=s*Math.ceil(Math.sqrt(o));g(t,n,i,l,this.compareMinX);for(let r=n;r<=i;r+=l){const n=Math.min(r+l-1,i);g(t,r,n,s,this.compareMinY);for(let i=r;i<=n;i+=s){const r=Math.min(i+s-1,n);a.children.push(this._build(t,i,r,e-1))}}return h(a,this.toBBox),a}_chooseSubtree(t,n,i,e){for(;e.push(n),!n.leaf&&e.length-1!==i;){let i,e=1/0,h=1/0;for(let o=0;o<n.children.length;o++){const s=n.children[o],l=c(s),u=(r=t,a=s,(Math.max(a.maxX,r.maxX)-Math.min(a.minX,r.minX))*(Math.max(a.maxY,r.maxY)-Math.min(a.minY,r.minY))-l);u<h?(h=u,e=l<e?l:e,i=s):u===h&&l<e&&(e=l,i=s)}n=i||n.children[0]}var r,a;return n}_insert(t,n,i){const e=i?t:this.toBBox(t),r=[],a=this._chooseSubtree(e,this.data,n,r);for(a.children.push(t),s(a,e);n>=0&&r[n].children.length>this._maxEntries;)this._split(r,n),n--;this._adjustParentBBoxes(e,r,n)}_split(t,n){const i=t[n],e=i.children.length,r=this._minEntries;this._chooseSplitAxis(i,r,e);const a=this._chooseSplitIndex(i,r,e),o=d(i.children.splice(a,i.children.length-a));o.height=i.height,o.leaf=i.leaf,h(i,this.toBBox),h(o,this.toBBox),n?t[n-1].children.push(o):this._splitRoot(i,o)}_splitRoot(t,n){this.data=d([t,n]),this.data.height=t.height+1,this.data.leaf=!1,h(this.data,this.toBBox)}_chooseSplitIndex(t,n,i){let e,r=1/0,a=1/0;for(let h=n;h<=i-n;h++){const n=o(t,0,h,this.toBBox),s=o(t,h,i,this.toBBox),l=f(n,s),u=c(n)+c(s);l<r?(r=l,e=h,a=u<a?u:a):l===r&&u<a&&(a=u,e=h)}return e||i-n}_chooseSplitAxis(t,n,i){const e=t.leaf?this.compareMinX:l,r=t.leaf?this.compareMinY:u;this._allDistMargin(t,n,i,e)<this._allDistMargin(t,n,i,r)&&t.children.sort(e)}_allDistMargin(t,n,i,e){t.children.sort(e);const r=this.toBBox,a=o(t,0,n,r),h=o(t,i-n,i,r);let l=m(a)+m(h);for(let e=n;e<i-n;e++){const n=t.children[e];s(a,t.leaf?r(n):n),l+=m(a)}for(let e=i-n-1;e>=n;e--){const n=t.children[e];s(h,t.leaf?r(n):n),l+=m(h)}return l}_adjustParentBBoxes(t,n,i){for(let e=i;e>=0;e--)s(n[e],t)}_condense(t){for(let n,i=t.length-1;i>=0;i--)0===t[i].children.length?i>0?(n=t[i-1].children,n.splice(n.indexOf(t[i]),1)):this.clear():h(t[i],this.toBBox)}}function a(t,n,i){if(!i)return n.indexOf(t);for(let e=0;e<n.length;e++)if(i(t,n[e]))return e;return-1}function h(t,n){o(t,0,t.children.length,n,t)}function o(t,n,i,e,r){r||(r=d(null)),r.minX=1/0,r.minY=1/0,r.maxX=-1/0,r.maxY=-1/0;for(let a=n;a<i;a++){const n=t.children[a];s(r,t.leaf?e(n):n)}return r}function s(t,n){return t.minX=Math.min(t.minX,n.minX),t.minY=Math.min(t.minY,n.minY),t.maxX=Math.max(t.maxX,n.maxX),t.maxY=Math.max(t.maxY,n.maxY),t}function l(t,n){return t.minX-n.minX}function u(t,n){return t.minY-n.minY}function c(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function m(t){return t.maxX-t.minX+(t.maxY-t.minY)}function f(t,n){const i=Math.max(t.minX,n.minX),e=Math.max(t.minY,n.minY),r=Math.min(t.maxX,n.maxX),a=Math.min(t.maxY,n.maxY);return Math.max(0,r-i)*Math.max(0,a-e)}function x(t,n){return t.minX<=n.minX&&t.minY<=n.minY&&n.maxX<=t.maxX&&n.maxY<=t.maxY}function p(t,n){return n.minX<=t.maxX&&n.minY<=t.maxY&&n.maxX>=t.minX&&n.maxY>=t.minY}function d(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function g(n,i,e,r,a){const h=[i,e];for(;h.length;){if((e=h.pop())-(i=h.pop())<=r)continue;const o=i+Math.ceil((e-i)/r/2)*r;t(n,o,i,e,a),h.push(i,o,o,e)}}class M{constructor(t=[],n=X){if(this.data=t,this.length=this.data.length,this.compare=n,this.length>0)for(let t=(this.length>>1)-1;t>=0;t--)this._down(t)}push(t){this.data.push(t),this.length++,this._up(this.length-1)}pop(){if(0===this.length)return;const t=this.data[0],n=this.data.pop();return this.length--,this.length>0&&(this.data[0]=n,this._down(0)),t}peek(){return this.data[0]}_up(t){const{data:n,compare:i}=this,e=n[t];for(;t>0;){const r=t-1>>1,a=n[r];if(i(e,a)>=0)break;n[t]=a,t=r}n[t]=e}_down(t){const{data:n,compare:i}=this,e=this.length>>1,r=n[t];for(;t<e;){let e=1+(t<<1),a=n[e];const h=e+1;if(h<this.length&&i(n[h],a)<0&&(e=h,a=n[h]),i(a,r)>=0)break;n[t]=a,t=e}n[t]=r}}function X(t,n){return t<n?-1:t>n?1:0}function Y(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var v={exports:{}},_=function(t,n,i,e){var r=t[0],a=t[1],h=!1;void 0===i&&(i=0),void 0===e&&(e=n.length);for(var o=(e-i)/2,s=0,l=o-1;s<o;l=s++){var u=n[i+2*s+0],c=n[i+2*s+1],m=n[i+2*l+0],f=n[i+2*l+1];c>a!=f>a&&r<(m-u)*(a-c)/(f-c)+u&&(h=!h)}return h},B=function(t,n,i,e){var r=t[0],a=t[1],h=!1;void 0===i&&(i=0),void 0===e&&(e=n.length);for(var o=e-i,s=0,l=o-1;s<o;l=s++){var u=n[s+i][0],c=n[s+i][1],m=n[l+i][0],f=n[l+i][1];c>a!=f>a&&r<(m-u)*(a-c)/(f-c)+u&&(h=!h)}return h};v.exports=function(t,n,i,e){return n.length>0&&Array.isArray(n[0])?B(t,n,i,e):_(t,n,i,e)},v.exports.nested=B,v.exports.flat=_;var b=Y(v.exports);const w=11102230246251565e-32,S=134217729,E=(3+8*w)*w;function O(t,n,i,e,r){let a,h,o,s,l=n[0],u=e[0],c=0,m=0;u>l==u>-l?(a=l,l=n[++c]):(a=u,u=e[++m]);let f=0;if(c<t&&m<i)for(u>l==u>-l?(h=l+a,o=a-(h-l),l=n[++c]):(h=u+a,o=a-(h-u),u=e[++m]),a=h,0!==o&&(r[f++]=o);c<t&&m<i;)u>l==u>-l?(h=a+l,s=h-a,o=a-(h-s)+(l-s),l=n[++c]):(h=a+u,s=h-a,o=a-(h-s)+(u-s),u=e[++m]),a=h,0!==o&&(r[f++]=o);for(;c<t;)h=a+l,s=h-a,o=a-(h-s)+(l-s),l=n[++c],a=h,0!==o&&(r[f++]=o);for(;m<i;)h=a+u,s=h-a,o=a-(h-s)+(u-s),u=e[++m],a=h,0!==o&&(r[f++]=o);return 0===a&&0!==f||(r[f++]=a),f}function y(t){return new Float64Array(t)}const A=33306690738754716e-32,k=22204460492503146e-32,j=11093356479670487e-47,D=y(4),P=y(8),R=y(12),q=y(16),I=y(4),J=(t,n,i)=>{n=Math.max(0,void 0===n?2:n),i=i||0;var e=function(t){for(var n=t[0],i=t[0],e=t[0],r=t[0],a=0;a<t.length;a++){var h=t[a];h[0]<n[0]&&(n=h),h[0]>e[0]&&(e=h),h[1]<i[1]&&(i=h),h[1]>r[1]&&(r=h)}var o=[n,i,e,r],s=o.slice();for(a=0;a<t.length;a++)b(t[a],o)||s.push(t[a]);return function(t){t.sort(V);for(var n=[],i=0;i<t.length;i++){for(;n.length>=2&&H(n[n.length-2],n[n.length-1],t[i])<=0;)n.pop();n.push(t[i])}for(var e=[],r=t.length-1;r>=0;r--){for(;e.length>=2&&H(e[e.length-2],e[e.length-1],t[r])<=0;)e.pop();e.push(t[r])}return e.pop(),n.pop(),n.concat(e)}(s)}(t),a=new r(16);a.toBBox=function(t){return{minX:t[0],minY:t[1],maxX:t[0],maxY:t[1]}},a.compareMinX=function(t,n){return t[0]-n[0]},a.compareMinY=function(t,n){return t[1]-n[1]},a.load(t);for(var h,o=[],s=0;s<e.length;s++){var l=e[s];a.remove(l),h=L(l,h),o.push(h)}var u=new r(16);for(s=0;s<o.length;s++)u.insert(K(o[s]));for(var c=n*n,m=i*i;o.length;){var f=o.shift(),x=f.p,p=f.next.p,d=Q(x,p);if(!(d<m)){var g=d/c;(l=N(a,f.prev.p,x,p,f.next.next.p,g,u))&&Math.min(Q(l,x),Q(l,p))<=g&&(o.push(f),o.push(L(l,f)),a.remove(l),u.remove(f),u.insert(K(f)),u.insert(K(f.next)))}}f=h;var M=[];do{M.push(f.p),f=f.next}while(f!==h);return M.push(f.p),M};function N(t,n,i,e,r,a,h){for(var o=new M([],F),s=t.data;s;){for(var l=0;l<s.children.length;l++){var u=s.children[l],c=s.leaf?T(u,i,e):z(i,e,u);c>a||o.push({node:u,dist:c})}for(;o.length&&!o.peek().node.children;){var m=o.pop(),f=m.node,x=T(f,n,i),p=T(f,e,r);if(m.dist<x&&m.dist<p&&G(i,f,h)&&G(e,f,h))return f}(s=o.pop())&&(s=s.node)}return null}function F(t,n){return t.dist-n.dist}function z(t,n,i){if(C(t,i)||C(n,i))return 0;var e=U(t[0],t[1],n[0],n[1],i.minX,i.minY,i.maxX,i.minY);if(0===e)return 0;var r=U(t[0],t[1],n[0],n[1],i.minX,i.minY,i.minX,i.maxY);if(0===r)return 0;var a=U(t[0],t[1],n[0],n[1],i.maxX,i.minY,i.maxX,i.maxY);if(0===a)return 0;var h=U(t[0],t[1],n[0],n[1],i.minX,i.maxY,i.maxX,i.maxY);return 0===h?0:Math.min(e,r,a,h)}function C(t,n){return t[0]>=n.minX&&t[0]<=n.maxX&&t[1]>=n.minY&&t[1]<=n.maxY}function G(t,n,i){for(var e,r,a,h,o=Math.min(t[0],n[0]),s=Math.min(t[1],n[1]),l=Math.max(t[0],n[0]),u=Math.max(t[1],n[1]),c=i.search({minX:o,minY:s,maxX:l,maxY:u}),m=0;m<c.length;m++)if(e=c[m].p,r=c[m].next.p,a=t,e!==(h=n)&&r!==a&&H(e,r,a)>0!=H(e,r,h)>0&&H(a,h,e)>0!=H(a,h,r)>0)return!1;return!0}function H(t,n,i){return function(t,n,i,e,r,a){const h=(n-a)*(i-r),o=(t-r)*(e-a),s=h-o,l=Math.abs(h+o);return Math.abs(s)>=A*l?s:-function(t,n,i,e,r,a,h){let o,s,l,u,c,m,f,x,p,d,g,M,X,Y,v,_,B,b;const w=t-r,y=i-r,A=n-a,J=e-a;Y=w*J,m=S*w,f=m-(m-w),x=w-f,m=S*J,p=m-(m-J),d=J-p,v=x*d-(Y-f*p-x*p-f*d),_=A*y,m=S*A,f=m-(m-A),x=A-f,m=S*y,p=m-(m-y),d=y-p,B=x*d-(_-f*p-x*p-f*d),g=v-B,c=v-g,D[0]=v-(g+c)+(c-B),M=Y+g,c=M-Y,X=Y-(M-c)+(g-c),g=X-_,c=X-g,D[1]=X-(g+c)+(c-_),b=M+g,c=b-M,D[2]=M-(b-c)+(g-c),D[3]=b;let N=function(t,n){let i=n[0];for(let t=1;t<4;t++)i+=n[t];return i}(0,D),F=k*h;if(N>=F||-N>=F)return N;if(c=t-w,o=t-(w+c)+(c-r),c=i-y,l=i-(y+c)+(c-r),c=n-A,s=n-(A+c)+(c-a),c=e-J,u=e-(J+c)+(c-a),0===o&&0===s&&0===l&&0===u)return N;if(F=j*h+E*Math.abs(N),N+=w*u+J*o-(A*l+y*s),N>=F||-N>=F)return N;Y=o*J,m=S*o,f=m-(m-o),x=o-f,m=S*J,p=m-(m-J),d=J-p,v=x*d-(Y-f*p-x*p-f*d),_=s*y,m=S*s,f=m-(m-s),x=s-f,m=S*y,p=m-(m-y),d=y-p,B=x*d-(_-f*p-x*p-f*d),g=v-B,c=v-g,I[0]=v-(g+c)+(c-B),M=Y+g,c=M-Y,X=Y-(M-c)+(g-c),g=X-_,c=X-g,I[1]=X-(g+c)+(c-_),b=M+g,c=b-M,I[2]=M-(b-c)+(g-c),I[3]=b;const z=O(4,D,4,I,P);Y=w*u,m=S*w,f=m-(m-w),x=w-f,m=S*u,p=m-(m-u),d=u-p,v=x*d-(Y-f*p-x*p-f*d),_=A*l,m=S*A,f=m-(m-A),x=A-f,m=S*l,p=m-(m-l),d=l-p,B=x*d-(_-f*p-x*p-f*d),g=v-B,c=v-g,I[0]=v-(g+c)+(c-B),M=Y+g,c=M-Y,X=Y-(M-c)+(g-c),g=X-_,c=X-g,I[1]=X-(g+c)+(c-_),b=M+g,c=b-M,I[2]=M-(b-c)+(g-c),I[3]=b;const C=O(z,P,4,I,R);Y=o*u,m=S*o,f=m-(m-o),x=o-f,m=S*u,p=m-(m-u),d=u-p,v=x*d-(Y-f*p-x*p-f*d),_=s*l,m=S*s,f=m-(m-s),x=s-f,m=S*l,p=m-(m-l),d=l-p,B=x*d-(_-f*p-x*p-f*d),g=v-B,c=v-g,I[0]=v-(g+c)+(c-B),M=Y+g,c=M-Y,X=Y-(M-c)+(g-c),g=X-_,c=X-g,I[1]=X-(g+c)+(c-_),b=M+g,c=b-M,I[2]=M-(b-c)+(g-c),I[3]=b;const G=O(C,R,4,I,q);return q[G-1]}(t,n,i,e,r,a,l)}(t[0],t[1],n[0],n[1],i[0],i[1])}function K(t){var n=t.p,i=t.next.p;return t.minX=Math.min(n[0],i[0]),t.minY=Math.min(n[1],i[1]),t.maxX=Math.max(n[0],i[0]),t.maxY=Math.max(n[1],i[1]),t}function L(t,n){var i={p:t,prev:null,next:null,minX:0,minY:0,maxX:0,maxY:0};return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Q(t,n){var i=t[0]-n[0],e=t[1]-n[1];return i*i+e*e}function T(t,n,i){var e=n[0],r=n[1],a=i[0]-e,h=i[1]-r;if(0!==a||0!==h){var o=((t[0]-e)*a+(t[1]-r)*h)/(a*a+h*h);o>1?(e=i[0],r=i[1]):o>0&&(e+=a*o,r+=h*o)}return(a=t[0]-e)*a+(h=t[1]-r)*h}function U(t,n,i,e,r,a,h,o){var s,l,u,c,m=i-t,f=e-n,x=h-r,p=o-a,d=t-r,g=n-a,M=m*m+f*f,X=m*x+f*p,Y=x*x+p*p,v=m*d+f*g,_=x*d+p*g,B=M*Y-X*X,b=B,w=B;0===B?(l=0,b=1,c=_,w=Y):(c=M*_-X*v,(l=X*_-Y*v)<0?(l=0,c=_,w=Y):l>b&&(l=b,c=_+X,w=Y)),c<0?(c=0,-v<0?l=0:-v>M?l=b:(l=-v,b=M)):c>w&&(c=w,-v+X<0?l=0:-v+X>M?l=b:(l=-v+X,b=M));var S=(1-(u=0===c?0:c/w))*r+u*h-((1-(s=0===l?0:l/b))*t+s*i),E=(1-u)*a+u*o-((1-s)*n+s*e);return S*S+E*E}function V(t,n){return t[0]===n[0]?t[1]-n[1]:t[0]-n[0]}export{J as concaveman,J as default};
//# sourceMappingURL=index.mjs.map