import type { Widget } from "@/interfaces";
import {
	changeActive,
	changeWidgetPosO,
	changeWidgetWHO,
	deleteCurCol,
	deleteWidget,
	setMoveWhole,
	setStyle,
} from "@/store/slices/tempWidgetSlice";
import { getFonts } from "@/utils";
import {
	Button,
	ColorPicker,
	InputNumber,
	Popconfirm,
	Radio,
	Select,
	Switch,
} from "antd";
import { useDispatch, useSelector } from "react-redux";

// 组件样式控制版面
const PanelStyle = () => {
	const dispatch = useDispatch();
	const active = useSelector((s: any) => s.tempWidget.activeIndex);
	const widget: Widget | undefined = useSelector(
		(s: any) => s.tempWidget.widgets[s.tempWidget.activeIndex],
	);
	const deleteCur = () => {
		dispatch(deleteWidget());
		dispatch(changeActive(-1));
	};
	return (
		<>
			<div className="title">当前组件</div>
			<div className=" space-y-[20px] px-5 p-3">
				<div className="flex gap-4">
					<span>
						<label>宽度</label>
						<InputNumber
							min={10}
							disabled={active === -1}
							value={active === -1 ? null : widget?.width}
							onChange={(e: any) =>
								dispatch(changeWidgetWHO({ width: e, height: widget?.height }))
							}
						/>
					</span>
					<span>
						<label>高度</label>
						<InputNumber
							min={10}
							disabled={active === -1}
							value={active === -1 ? null : widget?.height}
							onChange={(e: any) =>
								dispatch(changeWidgetWHO({ width: widget?.width, height: e }))
							}
						/>
					</span>
				</div>
				<div className="flex gap-4">
					<span>
						<label>横坐标</label>
						<InputNumber
							disabled={active === -1}
							value={active === -1 ? null : widget?.left}
							onChange={(e) =>
								dispatch(changeWidgetPosO({ left: e, top: widget?.top }))
							}
						/>
					</span>
					<span>
						<label>纵坐标</label>
						<InputNumber
							disabled={active === -1}
							value={active === -1 ? null : widget?.top}
							onChange={(e: any) =>
								dispatch(changeWidgetPosO({ left: widget?.left, top: e }))
							}
						/>
					</span>
				</div>
				<div className="flex gap-4">
					<span>
						<label>字号</label>
						<InputNumber
							disabled={active === -1}
							min={12}
							value={widget?.style?.FontSize ? widget?.style?.FontSize : null}
							onChange={(e: any) =>
								dispatch(setStyle({ ...widget?.style, FontSize: e }))
							}
						/>
					</span>
					<span>
						<label>字体颜色</label>
						<ColorPicker
							disabled={active === -1}
							onChangeComplete={(e: any) =>
								dispatch(
									setStyle({ ...widget?.style, FontColor: `#${e.toHex()}` }),
								)
							}
							value={
								widget?.style?.FontColor ? widget?.style?.FontColor : "000000"
							}
						/>
					</span>
				</div>
				<div>
					<label>字体</label>
					<Select
						style={{ width: 180 }}
						disabled={active === -1}
						value={widget?.style?.FontName ? widget?.style?.FontName : null}
						onSelect={(e: any) => {
							dispatch(setStyle({ ...widget?.style, FontName: e }));
						}}
						options={getFonts()}
					/>
				</div>
				<div className="flex gap-4">
					<span>
						<label>加粗</label>
						<Switch
							disabled={active === -1}
							onChange={(e: any) =>
								dispatch(setStyle({ ...widget?.style, Bold: e }))
							}
							checked={!!widget?.style?.Bold}
						/>
					</span>
					<span>
						<label>斜体</label>
						<Switch
							disabled={active === -1}
							onChange={(e: any) =>
								dispatch(setStyle({ ...widget?.style, Italic: e }))
							}
							checked={!!widget?.style?.Italic}
						/>
					</span>
					<span>
						<label>下划线</label>
						<Switch
							disabled={active === -1}
							onChange={(e: any) =>
								dispatch(setStyle({ ...widget?.style, Underline: e }))
							}
							checked={!!widget?.style?.Underline}
						/>
					</span>
				</div>
				<div>
					<label>对齐方式</label>
					<Radio.Group
						disabled={active === -1}
						onChange={(e: any) =>
							dispatch(
								setStyle({ ...widget?.style, Alignment: e.target.value }),
							)
						}
						value={widget?.style?.Alignment ? widget?.style?.Alignment : null}
					>
						<Radio value={"left"}>左</Radio>
						<Radio value={"center"}>中</Radio>
						<Radio value={"right"}>右</Radio>
					</Radio.Group>
				</div>
				<div />
				<div className="flex gap-4">
					<span>
						<label>垂直居中</label>
						<Switch
							disabled={active === -1}
							checked={!!widget?.style.VerticalCenter}
							onChange={(e: any) =>
								dispatch(setStyle({ ...widget?.style, VerticalCenter: e }))
							}
						/>
					</span>
					<span>
						<label>添加边框</label>
						<Switch
							disabled={active === -1 || widget?.type === "table"}
							onChange={(e: any) =>
								dispatch(setStyle({ ...widget?.style, BorderWidth: e ? 2 : 0 }))
							}
							checked={!!widget?.style?.BorderWidth}
						/>
					</span>
				</div>
				<div>
					<label>表格列</label>
					<Button
						disabled={
							active === -1 ||
							widget?.type !== "table" ||
							widget?.activeCol === -1
						}
						onClick={() => dispatch(deleteCurCol())}
					>
						删除当前列
					</Button>
				</div>
				<div className="flex gap-4">
					<span>
						<label>边框粗细</label>
						<InputNumber
							min={1}
							disabled={active === -1 || !widget?.style.BorderWidth}
							value={
								widget?.style?.BorderWidth ? widget?.style?.BorderWidth : null
							}
							onChange={(e: any) =>
								dispatch(setStyle({ ...widget?.style, BorderWidth: e }))
							}
						/>
					</span>
					<span>
						<label>边框颜色</label>
						<ColorPicker
							disabled={active === -1 || !widget?.style.BorderWidth}
							value={
								widget?.style?.BorderColor
									? widget?.style?.BorderColor
									: "000000"
							}
							onChangeComplete={(e: any) =>
								dispatch(
									setStyle({ ...widget?.style, BorderColor: `#${e.toHex()}` }),
								)
							}
						/>
					</span>
				</div>
				<div>
					<label>整体移动</label>
					<Switch onChange={(e: any) => dispatch(setMoveWhole(e))} />
				</div>
				<div>
					<Popconfirm
						title="确定删除？"
						onConfirm={deleteCur}
						okText="Yes"
						cancelText="No"
					>
						<Button danger disabled={active === -1}>
							删除组件
						</Button>
					</Popconfirm>
				</div>
			</div>
		</>
	);
};

export default PanelStyle;
