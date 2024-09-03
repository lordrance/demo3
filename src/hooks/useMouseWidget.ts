import store from "@/store";
import {
	changeActive,
	changeWidgetPos,
	moveAll,
} from "@/store/slices/tempWidgetSlice";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
//移动组件
const useMouseWidget = (index: number) => {
	const ref = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	const handleDown = (e: MouseEvent) => {
		e.stopPropagation();
		dispatch(changeActive(index));
		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleUp);
	};

	// 修改redux组件当前组件位置
	const handleMove = (e: MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		const width = store.getState().tempPage.width;
		const height = store.getState().tempPage.height;
		const isMoveWhole = store.getState().tempWidget.isMoveWhole;
		const trans = ref.current?.parentElement?.style.transform;
		const s = trans?.match(/scale\((.*?)\)/);
		const scale = s ? Number.parseFloat(s[1]) : 1;
		if (isMoveWhole)
			dispatch(
				moveAll({ moveX: e.movementX / scale, moveY: e.movementY / scale }),
			);
		else
			dispatch(
				changeWidgetPos({
					moveX: e.movementX / scale,
					moveY: e.movementY / scale,
					width,
					height,
				}),
			);
	};

	const handleUp = () => {
		document.removeEventListener("mousemove", handleMove);
		document.removeEventListener("mouseup", handleUp);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		ref.current?.addEventListener("mousedown", handleDown);
		return () => {
			ref.current?.removeEventListener("mousedown", handleDown);
		};
	}, []);

	return ref;
};

export default useMouseWidget;
