// 用双端口加载主JS文件Lodop.js(或CLodopfuncs.js兼容老版本)以防其中某端口被占:
const MainJS = "CLodopfuncs.js";
const URL_WS1 = `ws://localhost:8000/${MainJS}`; // ws用8000/18000
const URL_WS2 = `ws://localhost:18000/${MainJS}`;
const URL_HTTP1 = `http://localhost:8000/${MainJS}`; // http用8000/18000
const URL_HTTP2 = `http://localhost:18000/${MainJS}`;
const URL_HTTP3 = `https://localhost.lodop.net:8443/${MainJS}`; // https用8000/8443

// ==检查加载成功与否，如没成功则用http(s)再试==
// ==低版本CLODOP6.561/Lodop7.043及前)用本方法==
function checkOrTryHttp(): boolean {
	if ((window as any).getCLodop) return true;
	const head =
		document.head ||
		document.getElementsByTagName("head")[0] ||
		document.documentElement;
	const JS1 = document.createElement("script");
	const JS2 = document.createElement("script");
	const JS3 = document.createElement("script");
	JS1.src = URL_HTTP1;
	JS2.src = URL_HTTP2;
	JS3.src = URL_HTTP3;
	JS1.onerror = (e) => {
		if (window.location.protocol !== "https:")
			head.insertBefore(JS2, head.firstChild);
		else head.insertBefore(JS3, head.firstChild);
	};
	JS2.onerror = JS3.onerror = () => {
		const JSelf = document.createElement("script");
		JSelf.src = `/${MainJS}`; // JSelf让其它电脑通过本机打印（仅适用CLodop自带例子）
		document.head.insertBefore(JSelf, document.head.firstChild);
	};
	head.insertBefore(JS1, head.firstChild);
	return false;
}

// ==加载Lodop对象的主过程:==
(function loadCLodop() {
	if (!window.WebSocket && (window as any).MozWebSocket)
		(window as any).WebSocket = (window as any).MozWebSocket;
	// ws方式速度快(小于200ms)且可避免CORS错误,但要求Lodop版本足够新:
	try {
		const WSK1 = new WebSocket(URL_WS1);
		WSK1.onopen = (e) => {
			setTimeout(checkOrTryHttp, 200);
		};
		WSK1.onmessage = (e) => {
			// biome-ignore lint/security/noGlobalEval: <explanation>
			if (!(window as any).getCLodop) eval(e.data);
		};
		WSK1.onerror = (e) => {
			const WSK2 = new WebSocket(URL_WS2);
			WSK2.onopen = (e) => {
				setTimeout(checkOrTryHttp, 200);
			};
			WSK2.onmessage = (e) => {
				// biome-ignore lint/security/noGlobalEval: <explanation>
				if (!(window as any).getCLodop) eval(e.data);
			};
			WSK2.onerror = (e) => {
				checkOrTryHttp();
			};
		};
	} catch (e) {
		checkOrTryHttp();
	}
})();

// ==获取LODOP对象的主过程:==
export default function getLodop(
	oOBJECT?: HTMLElement | null,
	oEMBED?: HTMLElement | null,
): any {
	let LODOP: any;
	try {
		LODOP = (window as any).getCLodop();
		if (!LODOP && document.readyState !== "complete") {
			alert("C-Lodop没准备好，请稍后再试！");
			return;
		}
		// 清理原例子内的object或embed元素，避免乱提示：
		if (oEMBED?.parentNode) oEMBED.parentNode.removeChild(oEMBED);
		if (oOBJECT?.parentNode) oOBJECT.parentNode.removeChild(oOBJECT);
		return LODOP;
	} catch (err) {
		alert(`getLodop出错:${err}`);
	}
}
