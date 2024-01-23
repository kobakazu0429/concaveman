function t(t,i,r,h,a){n(t,i,r||0,h||t.length-1,a||e)}function n(t,e,r,h,a){for(;h>r;){if(h-r>600){var o=h-r+1,s=e-r+1,l=Math.log(o),u=.5*Math.exp(2*l/3),c=.5*Math.sqrt(l*u*(o-u)/o)*(s-o/2<0?-1:1);n(t,e,Math.max(r,Math.floor(e-s*u/o+c)),Math.min(h,Math.floor(e+(o-s)*u/o+c)),a)}var m=t[e],f=r,x=h;for(i(t,r,e),a(t[h],m)>0&&i(t,r,h);f<x;){for(i(t,f,x),f++,x--;a(t[f],m)<0;)f++;for(;a(t[x],m)>0;)x--}0===a(t[r],m)?i(t,r,x):i(t,++x,h),x<=e&&(r=x+1),e<=x&&(h=x-1)}}function i(t,n,i){var e=t[n];t[n]=t[i],t[i]=e}function e(t,n){return t<n?-1:t>n?1:0}class r{constructor(t=9){this._maxEntries=Math.max(4,t),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),this.clear()}all(){return this._all(this.data,[])}search(t){let n=this.data;const i=[];if(!p(t,n))return i;const e=this.toBBox,r=[];for(;n;){for(let h=0;h<n.children.length;h++){const a=n.children[h],o=n.leaf?e(a):a;p(t,o)&&(n.leaf?i.push(a):x(t,o)?this._all(a,i):r.push(a))}n=r.pop()}return i}collides(t){let n=this.data;if(!p(t,n))return!1;const i=[];for(;n;){for(let e=0;e<n.children.length;e++){const r=n.children[e],h=n.leaf?this.toBBox(r):r;if(p(t,h)){if(n.leaf||x(t,h))return!0;i.push(r)}}n=i.pop()}return!1}load(t){if(!t||!t.length)return this;if(t.length<this._minEntries){for(let n=0;n<t.length;n++)this.insert(t[n]);return this}let n=this._build(t.slice(),0,t.length-1,0);if(this.data.children.length)if(this.data.height===n.height)this._splitRoot(this.data,n);else{if(this.data.height<n.height){const t=this.data;this.data=n,n=t}this._insert(n,this.data.height-n.height-1,!0)}else this.data=n;return this}insert(t){return t&&this._insert(t,this.data.height-1),this}clear(){return this.data=d([]),this}remove(t,n){if(!t)return this;let i=this.data;const e=this.toBBox(t),r=[],a=[];let o,s,l;for(;i||r.length;){if(i||(i=r.pop(),s=r[r.length-1],o=a.pop(),l=!0),i.leaf){const e=h(t,i.children,n);if(-1!==e)return i.children.splice(e,1),r.push(i),this._condense(r),this}l||i.leaf||!x(i,e)?s?(o++,i=s.children[o],l=!1):i=null:(r.push(i),a.push(o),o=0,s=i,i=i.children[0])}return this}toBBox(t){return t}compareMinX(t,n){return t.minX-n.minX}compareMinY(t,n){return t.minY-n.minY}toJSON(){return this.data}fromJSON(t){return this.data=t,this}_all(t,n){const i=[];for(;t;)t.leaf?n.push(...t.children):i.push(...t.children),t=i.pop();return n}_build(t,n,i,e){const r=i-n+1;let h,o=this._maxEntries;if(r<=o)return h=d(t.slice(n,i+1)),a(h,this.toBBox),h;e||(e=Math.ceil(Math.log(r)/Math.log(o)),o=Math.ceil(r/Math.pow(o,e-1))),h=d([]),h.leaf=!1,h.height=e;const s=Math.ceil(r/o),l=s*Math.ceil(Math.sqrt(o));g(t,n,i,l,this.compareMinX);for(let r=n;r<=i;r+=l){const n=Math.min(r+l-1,i);g(t,r,n,s,this.compareMinY);for(let i=r;i<=n;i+=s){const r=Math.min(i+s-1,n);h.children.push(this._build(t,i,r,e-1))}}return a(h,this.toBBox),h}_chooseSubtree(t,n,i,e){for(;e.push(n),!n.leaf&&e.length-1!==i;){let i,e=1/0,a=1/0;for(let o=0;o<n.children.length;o++){const s=n.children[o],l=c(s),u=(r=t,h=s,(Math.max(h.maxX,r.maxX)-Math.min(h.minX,r.minX))*(Math.max(h.maxY,r.maxY)-Math.min(h.minY,r.minY))-l);u<a?(a=u,e=l<e?l:e,i=s):u===a&&l<e&&(e=l,i=s)}n=i||n.children[0]}var r,h;return n}_insert(t,n,i){const e=i?t:this.toBBox(t),r=[],h=this._chooseSubtree(e,this.data,n,r);for(h.children.push(t),s(h,e);n>=0&&r[n].children.length>this._maxEntries;)this._split(r,n),n--;this._adjustParentBBoxes(e,r,n)}_split(t,n){const i=t[n],e=i.children.length,r=this._minEntries;this._chooseSplitAxis(i,r,e);const h=this._chooseSplitIndex(i,r,e),o=d(i.children.splice(h,i.children.length-h));o.height=i.height,o.leaf=i.leaf,a(i,this.toBBox),a(o,this.toBBox),n?t[n-1].children.push(o):this._splitRoot(i,o)}_splitRoot(t,n){this.data=d([t,n]),this.data.height=t.height+1,this.data.leaf=!1,a(this.data,this.toBBox)}_chooseSplitIndex(t,n,i){let e,r=1/0,h=1/0;for(let a=n;a<=i-n;a++){const n=o(t,0,a,this.toBBox),s=o(t,a,i,this.toBBox),l=f(n,s),u=c(n)+c(s);l<r?(r=l,e=a,h=u<h?u:h):l===r&&u<h&&(h=u,e=a)}return e||i-n}_chooseSplitAxis(t,n,i){const e=t.leaf?this.compareMinX:l,r=t.leaf?this.compareMinY:u;this._allDistMargin(t,n,i,e)<this._allDistMargin(t,n,i,r)&&t.children.sort(e)}_allDistMargin(t,n,i,e){t.children.sort(e);const r=this.toBBox,h=o(t,0,n,r),a=o(t,i-n,i,r);let l=m(h)+m(a);for(let e=n;e<i-n;e++){const n=t.children[e];s(h,t.leaf?r(n):n),l+=m(h)}for(let e=i-n-1;e>=n;e--){const n=t.children[e];s(a,t.leaf?r(n):n),l+=m(a)}return l}_adjustParentBBoxes(t,n,i){for(let e=i;e>=0;e--)s(n[e],t)}_condense(t){for(let n,i=t.length-1;i>=0;i--)0===t[i].children.length?i>0?(n=t[i-1].children,n.splice(n.indexOf(t[i]),1)):this.clear():a(t[i],this.toBBox)}}function h(t,n,i){if(!i)return n.indexOf(t);for(let e=0;e<n.length;e++)if(i(t,n[e]))return e;return-1}function a(t,n){o(t,0,t.children.length,n,t)}function o(t,n,i,e,r){r||(r=d(null)),r.minX=1/0,r.minY=1/0,r.maxX=-1/0,r.maxY=-1/0;for(let h=n;h<i;h++){const n=t.children[h];s(r,t.leaf?e(n):n)}return r}function s(t,n){return t.minX=Math.min(t.minX,n.minX),t.minY=Math.min(t.minY,n.minY),t.maxX=Math.max(t.maxX,n.maxX),t.maxY=Math.max(t.maxY,n.maxY),t}function l(t,n){return t.minX-n.minX}function u(t,n){return t.minY-n.minY}function c(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function m(t){return t.maxX-t.minX+(t.maxY-t.minY)}function f(t,n){const i=Math.max(t.minX,n.minX),e=Math.max(t.minY,n.minY),r=Math.min(t.maxX,n.maxX),h=Math.min(t.maxY,n.maxY);return Math.max(0,r-i)*Math.max(0,h-e)}function x(t,n){return t.minX<=n.minX&&t.minY<=n.minY&&n.maxX<=t.maxX&&n.maxY<=t.maxY}function p(t,n){return n.minX<=t.maxX&&n.minY<=t.maxY&&n.maxX>=t.minX&&n.maxY>=t.minY}function d(t){return{children:t,height:1,leaf:!0,minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function g(n,i,e,r,h){const a=[i,e];for(;a.length;){if((e=a.pop())-(i=a.pop())<=r)continue;const o=i+Math.ceil((e-i)/r/2)*r;t(n,o,i,e,h),a.push(i,o,o,e)}}class M{constructor(t=[],n=X){if(this.data=t,this.length=this.data.length,this.compare=n,this.length>0)for(let t=(this.length>>1)-1;t>=0;t--)this._down(t)}push(t){this.data.push(t),this.length++,this._up(this.length-1)}pop(){if(0===this.length)return;const t=this.data[0],n=this.data.pop();return this.length--,this.length>0&&(this.data[0]=n,this._down(0)),t}peek(){return this.data[0]}_up(t){const{data:n,compare:i}=this,e=n[t];for(;t>0;){const r=t-1>>1,h=n[r];if(i(e,h)>=0)break;n[t]=h,t=r}n[t]=e}_down(t){const{data:n,compare:i}=this,e=this.length>>1,r=n[t];for(;t<e;){let e=1+(t<<1),h=n[e];const a=e+1;if(a<this.length&&i(n[a],h)<0&&(e=a,h=n[a]),i(h,r)>=0)break;n[t]=h,t=e}n[t]=r}}function X(t,n){return t<n?-1:t>n?1:0}function Y(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var v={exports:{}},_=function(t,n,i,e){var r=t[0],h=t[1],a=!1;void 0===i&&(i=0),void 0===e&&(e=n.length);for(var o=(e-i)/2,s=0,l=o-1;s<o;l=s++){var u=n[i+2*s+0],c=n[i+2*s+1],m=n[i+2*l+0],f=n[i+2*l+1];c>h!=f>h&&r<(m-u)*(h-c)/(f-c)+u&&(a=!a)}return a},B=function(t,n,i,e){var r=t[0],h=t[1],a=!1;void 0===i&&(i=0),void 0===e&&(e=n.length);for(var o=e-i,s=0,l=o-1;s<o;l=s++){var u=n[s+i][0],c=n[s+i][1],m=n[l+i][0],f=n[l+i][1];c>h!=f>h&&r<(m-u)*(h-c)/(f-c)+u&&(a=!a)}return a};v.exports=function(t,n,i,e){return n.length>0&&Array.isArray(n[0])?B(t,n,i,e):_(t,n,i,e)},v.exports.nested=B,v.exports.flat=_;var b=Y(v.exports);const w=11102230246251565e-32,S=134217729,E=(3+8*w)*w;function O(t,n,i,e,r){let h,a,o,s,l=n[0],u=e[0],c=0,m=0;u>l==u>-l?(h=l,l=n[++c]):(h=u,u=e[++m]);let f=0;if(c<t&&m<i)for(u>l==u>-l?(a=l+h,o=h-(a-l),l=n[++c]):(a=u+h,o=h-(a-u),u=e[++m]),h=a,0!==o&&(r[f++]=o);c<t&&m<i;)u>l==u>-l?(a=h+l,s=a-h,o=h-(a-s)+(l-s),l=n[++c]):(a=h+u,s=a-h,o=h-(a-s)+(u-s),u=e[++m]),h=a,0!==o&&(r[f++]=o);for(;c<t;)a=h+l,s=a-h,o=h-(a-s)+(l-s),l=n[++c],h=a,0!==o&&(r[f++]=o);for(;m<i;)a=h+u,s=a-h,o=h-(a-s)+(u-s),u=e[++m],h=a,0!==o&&(r[f++]=o);return 0===h&&0!==f||(r[f++]=h),f}function y(t){return new Float64Array(t)}const A=33306690738754716e-32,k=22204460492503146e-32,j=11093356479670487e-47,D=y(4),P=y(8),R=y(12),q=y(16),I=y(4);function J(t,n,i){n=Math.max(0,void 0===n?2:n),i=i||0;var e=function(t){for(var n=t[0],i=t[0],e=t[0],r=t[0],h=0;h<t.length;h++){var a=t[h];a[0]<n[0]&&(n=a),a[0]>e[0]&&(e=a),a[1]<i[1]&&(i=a),a[1]>r[1]&&(r=a)}var o=[n,i,e,r],s=o.slice();for(h=0;h<t.length;h++)b(t[h],o)||s.push(t[h]);return function(t){t.sort(V);for(var n=[],i=0;i<t.length;i++){for(;n.length>=2&&H(n[n.length-2],n[n.length-1],t[i])<=0;)n.pop();n.push(t[i])}for(var e=[],r=t.length-1;r>=0;r--){for(;e.length>=2&&H(e[e.length-2],e[e.length-1],t[r])<=0;)e.pop();e.push(t[r])}return e.pop(),n.pop(),n.concat(e)}(s)}(t),h=new r(16);h.toBBox=function(t){return{minX:t[0],minY:t[1],maxX:t[0],maxY:t[1]}},h.compareMinX=function(t,n){return t[0]-n[0]},h.compareMinY=function(t,n){return t[1]-n[1]},h.load(t);for(var a,o=[],s=0;s<e.length;s++){var l=e[s];h.remove(l),a=L(l,a),o.push(a)}var u=new r(16);for(s=0;s<o.length;s++)u.insert(K(o[s]));for(var c=n*n,m=i*i;o.length;){var f=o.shift(),x=f.p,p=f.next.p,d=Q(x,p);if(!(d<m)){var g=d/c;(l=N(h,f.prev.p,x,p,f.next.next.p,g,u))&&Math.min(Q(l,x),Q(l,p))<=g&&(o.push(f),o.push(L(l,f)),h.remove(l),u.remove(f),u.insert(K(f)),u.insert(K(f.next)))}}f=a;var M=[];do{M.push(f.p),f=f.next}while(f!==a);return M.push(f.p),M}function N(t,n,i,e,r,h,a){for(var o=new M([],F),s=t.data;s;){for(var l=0;l<s.children.length;l++){var u=s.children[l],c=s.leaf?T(u,i,e):z(i,e,u);c>h||o.push({node:u,dist:c})}for(;o.length&&!o.peek().node.children;){var m=o.pop(),f=m.node,x=T(f,n,i),p=T(f,e,r);if(m.dist<x&&m.dist<p&&G(i,f,a)&&G(e,f,a))return f}(s=o.pop())&&(s=s.node)}return null}function F(t,n){return t.dist-n.dist}function z(t,n,i){if(C(t,i)||C(n,i))return 0;var e=U(t[0],t[1],n[0],n[1],i.minX,i.minY,i.maxX,i.minY);if(0===e)return 0;var r=U(t[0],t[1],n[0],n[1],i.minX,i.minY,i.minX,i.maxY);if(0===r)return 0;var h=U(t[0],t[1],n[0],n[1],i.maxX,i.minY,i.maxX,i.maxY);if(0===h)return 0;var a=U(t[0],t[1],n[0],n[1],i.minX,i.maxY,i.maxX,i.maxY);return 0===a?0:Math.min(e,r,h,a)}function C(t,n){return t[0]>=n.minX&&t[0]<=n.maxX&&t[1]>=n.minY&&t[1]<=n.maxY}function G(t,n,i){for(var e,r,h,a,o=Math.min(t[0],n[0]),s=Math.min(t[1],n[1]),l=Math.max(t[0],n[0]),u=Math.max(t[1],n[1]),c=i.search({minX:o,minY:s,maxX:l,maxY:u}),m=0;m<c.length;m++)if(e=c[m].p,r=c[m].next.p,h=t,e!==(a=n)&&r!==h&&H(e,r,h)>0!=H(e,r,a)>0&&H(h,a,e)>0!=H(h,a,r)>0)return!1;return!0}function H(t,n,i){return function(t,n,i,e,r,h){const a=(n-h)*(i-r),o=(t-r)*(e-h),s=a-o,l=Math.abs(a+o);return Math.abs(s)>=A*l?s:-function(t,n,i,e,r,h,a){let o,s,l,u,c,m,f,x,p,d,g,M,X,Y,v,_,B,b;const w=t-r,y=i-r,A=n-h,J=e-h;Y=w*J,m=S*w,f=m-(m-w),x=w-f,m=S*J,p=m-(m-J),d=J-p,v=x*d-(Y-f*p-x*p-f*d),_=A*y,m=S*A,f=m-(m-A),x=A-f,m=S*y,p=m-(m-y),d=y-p,B=x*d-(_-f*p-x*p-f*d),g=v-B,c=v-g,D[0]=v-(g+c)+(c-B),M=Y+g,c=M-Y,X=Y-(M-c)+(g-c),g=X-_,c=X-g,D[1]=X-(g+c)+(c-_),b=M+g,c=b-M,D[2]=M-(b-c)+(g-c),D[3]=b;let N=function(t,n){let i=n[0];for(let t=1;t<4;t++)i+=n[t];return i}(0,D),F=k*a;if(N>=F||-N>=F)return N;if(c=t-w,o=t-(w+c)+(c-r),c=i-y,l=i-(y+c)+(c-r),c=n-A,s=n-(A+c)+(c-h),c=e-J,u=e-(J+c)+(c-h),0===o&&0===s&&0===l&&0===u)return N;if(F=j*a+E*Math.abs(N),N+=w*u+J*o-(A*l+y*s),N>=F||-N>=F)return N;Y=o*J,m=S*o,f=m-(m-o),x=o-f,m=S*J,p=m-(m-J),d=J-p,v=x*d-(Y-f*p-x*p-f*d),_=s*y,m=S*s,f=m-(m-s),x=s-f,m=S*y,p=m-(m-y),d=y-p,B=x*d-(_-f*p-x*p-f*d),g=v-B,c=v-g,I[0]=v-(g+c)+(c-B),M=Y+g,c=M-Y,X=Y-(M-c)+(g-c),g=X-_,c=X-g,I[1]=X-(g+c)+(c-_),b=M+g,c=b-M,I[2]=M-(b-c)+(g-c),I[3]=b;const z=O(4,D,4,I,P);Y=w*u,m=S*w,f=m-(m-w),x=w-f,m=S*u,p=m-(m-u),d=u-p,v=x*d-(Y-f*p-x*p-f*d),_=A*l,m=S*A,f=m-(m-A),x=A-f,m=S*l,p=m-(m-l),d=l-p,B=x*d-(_-f*p-x*p-f*d),g=v-B,c=v-g,I[0]=v-(g+c)+(c-B),M=Y+g,c=M-Y,X=Y-(M-c)+(g-c),g=X-_,c=X-g,I[1]=X-(g+c)+(c-_),b=M+g,c=b-M,I[2]=M-(b-c)+(g-c),I[3]=b;const C=O(z,P,4,I,R);Y=o*u,m=S*o,f=m-(m-o),x=o-f,m=S*u,p=m-(m-u),d=u-p,v=x*d-(Y-f*p-x*p-f*d),_=s*l,m=S*s,f=m-(m-s),x=s-f,m=S*l,p=m-(m-l),d=l-p,B=x*d-(_-f*p-x*p-f*d),g=v-B,c=v-g,I[0]=v-(g+c)+(c-B),M=Y+g,c=M-Y,X=Y-(M-c)+(g-c),g=X-_,c=X-g,I[1]=X-(g+c)+(c-_),b=M+g,c=b-M,I[2]=M-(b-c)+(g-c),I[3]=b;const G=O(C,R,4,I,q);return q[G-1]}(t,n,i,e,r,h,l)}(t[0],t[1],n[0],n[1],i[0],i[1])}function K(t){var n=t.p,i=t.next.p;return t.minX=Math.min(n[0],i[0]),t.minY=Math.min(n[1],i[1]),t.maxX=Math.max(n[0],i[0]),t.maxY=Math.max(n[1],i[1]),t}function L(t,n){var i={p:t,prev:null,next:null,minX:0,minY:0,maxX:0,maxY:0};return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Q(t,n){var i=t[0]-n[0],e=t[1]-n[1];return i*i+e*e}function T(t,n,i){var e=n[0],r=n[1],h=i[0]-e,a=i[1]-r;if(0!==h||0!==a){var o=((t[0]-e)*h+(t[1]-r)*a)/(h*h+a*a);o>1?(e=i[0],r=i[1]):o>0&&(e+=h*o,r+=a*o)}return(h=t[0]-e)*h+(a=t[1]-r)*a}function U(t,n,i,e,r,h,a,o){var s,l,u,c,m=i-t,f=e-n,x=a-r,p=o-h,d=t-r,g=n-h,M=m*m+f*f,X=m*x+f*p,Y=x*x+p*p,v=m*d+f*g,_=x*d+p*g,B=M*Y-X*X,b=B,w=B;0===B?(l=0,b=1,c=_,w=Y):(c=M*_-X*v,(l=X*_-Y*v)<0?(l=0,c=_,w=Y):l>b&&(l=b,c=_+X,w=Y)),c<0?(c=0,-v<0?l=0:-v>M?l=b:(l=-v,b=M)):c>w&&(c=w,-v+X<0?l=0:-v+X>M?l=b:(l=-v+X,b=M));var S=(1-(u=0===c?0:c/w))*r+u*a-((1-(s=0===l?0:l/b))*t+s*i),E=(1-u)*h+u*o-((1-s)*n+s*e);return S*S+E*E}function V(t,n){return t[0]===n[0]?t[1]-n[1]:t[0]-n[0]}export{J as concaveman};
//# sourceMappingURL=index.mjs.map
