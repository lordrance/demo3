import useMouseWidget from "@/hooks/useMouseWidget";
import type { Column, Widget } from "@/interfaces";
import { setActiveCol } from "@/store/slices/tempWidgetSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./index.module.scss";

//表格组件
const Table = ({ index, isDesign }: { index: number; isDesign: boolean }) => {
	const dispatch = useDispatch();
	const data: Widget = useSelector((s: any) => s.tempWidget.widgets[index]);
	const ref = useMouseWidget(index);
	const handleClick = (e: any) => {
		if (isDesign) dispatch(setActiveCol(e.target.cellIndex));
	};

	return (
		<div
			className={styles.root}
			ref={isDesign ? ref : null}
			style={{
				width: `${data.width}px`,
				height: `${data.height}px`,
				left: `${data.left}px`,
				top: `${data.top}px`,
				fontSize: `${data?.style?.FontSize}pt`,
				fontWeight: data?.style?.Bold ? "bold" : "normal",
				fontStyle: data?.style?.Italic ? "italic" : "normal",
				textDecoration: data?.style?.Underline ? "underline" : "none",
				textAlign:
					data?.style?.Alignment === "right"
						? "right"
						: data?.style?.Alignment === "center"
							? "center"
							: "left",
				color: data?.style?.FontColor,
				fontFamily: data?.style?.FontName,
			}}
		>
			<table
				contentEditable={data.isEdit}
				suppressContentEditableWarning={true}
				onClick={handleClick}
			>
				<thead>
					<tr>
						{data.columns?.map((x: Column, index: number) => (
							<th
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								style={{
									backgroundColor:
										index === data.activeCol ? "#D2F3EE" : undefined,
									borderColor: data.style?.BorderColor
										? data.style?.BorderColor
										: "#000000",
									borderWidth: data.style?.BorderWidth
										? `${data.style?.BorderWidth}px`
										: undefined,
								}}
							>
								{x.name}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{data.columns?.map((x: Column, index: number) => (
							<td
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={index}
								style={{
									backgroundColor:
										index === data.activeCol ? "#D2F3EE" : undefined,
									borderColor: data.style?.BorderColor
										? data.style?.BorderColor
										: "#000000",
									borderWidth: data.style?.BorderWidth
										? // biome-ignore lint/style/useTemplate: <explanation>
											data.style?.BorderWidth + "px"
										: undefined,
								}}
							>
								{`{${x.value}}`}
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	);
};

export default Table;
