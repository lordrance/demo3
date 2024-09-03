import useMouseScreen from "@/hooks/useMouseScreen";
import type { Widget } from "@/interfaces";
import { selectWidget } from "@/utils";
import { useSelector } from "react-redux";
import sytles from "./index.module.scss";

// 预览窗口
const Preview = () => {
	const ref = useMouseScreen();
	const widgets: Widget[] = useSelector((s: any) => s.tempWidget.widgets);
	const width = useSelector((s: any) => s.tempPage.width);
	const height = useSelector((s: any) => s.tempPage.height);
	return (
		<div
			ref={ref}
			className={sytles.root}
			style={{ width: width, height: height }}
		>
			{widgets.map((x: any, index: number) => {
				return selectWidget(x.type, index, false);
			})}
		</div>
	);
};

export default Preview;
