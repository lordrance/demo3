import Preview from "@/components/preview";
import type { Page, Template } from "@/interfaces";
import { preview } from "@/lodop";
import store from "@/store";
import {
	changeTempName,
	changeTempPageWH,
	changeTempWH,
	createPage,
	setType,
	setUUID,
} from "@/store/slices/tempPageSlice";
import { createWidgets } from "@/store/slices/tempWidgetSlice";
import { getTempType } from "@/utils";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Popconfirm, Select, message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { getTestData } from "@/utils/mock";

const { Search, TextArea } = Input;
//模板打印主界面
const TempPrint = () => {
	const navigateTo = useNavigate();
	const tempPage = useSelector((s: any) => s.tempPage);
	const dispatch = useDispatch();
	const str = localStorage.getItem("temps");
	const data: Template[] = str ? JSON.parse(str) : [];
	data.sort((a, b) => (a.page.name < b.page.name ? -1 : 1));
	const [testDataModal, setTestDataModal] = useState(false);
	const [newTempModal, setNewTempModal] = useState(false);

	const [showData, setShowData] = useState(data);

	//测试数据字符串
	let testData = "";

	// 测试数据预览确定，将testData字符串转js对象
	const handleOk = () => {
		const temp: Template = {
			page: tempPage,
			widgets: store.getState().tempWidget.widgets,
		};
		let data: any = null;
		try {
			data = JSON.parse(testData);
		} catch (err) {
			message.error("数据格式错误");
			return;
		}
		preview(temp, data);
		setTestDataModal(false);
	};

	// 选择模板，将选择的模板数据发送到redux
	const handleChoose = (index: number) => {
		dispatch(createPage(data[index].page));
		dispatch(createWidgets(data[index].widgets));
	};

	// 删除模板，从localStorage里移除对应项
	const handleDelete = () => {
		let str = localStorage.getItem("temps");
		const data: Template[] = str ? JSON.parse(str) : [];
		data.sort((a, b) => (a.page.name < b.page.name ? -1 : 1));
		const index = data.findIndex((x) => x.page.uuid === tempPage.uuid);
		if (index !== -1) data.splice(index, 1);
		str = JSON.stringify(data);
		localStorage.setItem("temps", str);
		clearTemp();
		setShowData(data);
		message.success("删除成功");
	};

	// 创建模板，并跳转到设计器
	const createTemp = () => {
		dispatch(changeTempWH({ width: 210 * 3.8, height: 297 * 3.8 }));
		dispatch(changeTempPageWH({ pageWidth: 210, pageHeight: 297 }));
		dispatch(setUUID(uuid()));
		setNewTempModal(false);
		navigateTo("/designer");
	};

	// 清空redux的模板数据
	const clearTemp = () => {
		const page: Page = {
			name: "",
			width: 0,
			height: 0,
			pageWidth: 0,
			pageHeight: 0,
			type: "",
			uuid: "null",
		};
		dispatch(createPage(page));
		dispatch(createWidgets([]));
	};

	const handleSearch = (e: any) => {
		if (e === "" || e === null || e === undefined) {
			setShowData(data);
			return;
		}
		const d = data.filter((x) => x.page.name.includes(e));
		setShowData(d);
	};

	return (
		<div className="flex bg-white">
			<div className="p-4 bg-white">
				{/* 左侧模板列表 */}
				<div className="text-lg">模板列表</div>
				<span className="flex p-2 gap-2">
					<Search
						placeholder="input search text"
						className="search"
						onSearch={handleSearch}
					/>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						className="create"
						onClick={() => {
							clearTemp();
							setNewTempModal(true);
						}}
					>
						新建
					</Button>
				</span>
				<div className="p-3 space-y-[4px] overflow-auto h-[81vh]">
					{showData.map((x, index) => (
						<div className="hover:bg-zinc-200 p-2 cursor-pointer" onClick={() => handleChoose(index)} key={x.page.uuid}>
							{x.page.name}
						</div>
					))}
				</div>
			</div>
			<div className="w-[81vw] h-[87vh]">
				<div className="flex justify-end p-4 items-center gap-5">
					<span>{tempPage.uuid !== "null" ? tempPage.name : ""}</span>
						<Button
							onClick={() => setTestDataModal(true)}
							disabled={tempPage.uuid === "null"}
						>
							测试数据预览
						</Button>
						<Popconfirm
							title="确定删除？"
							onConfirm={handleDelete}
							okText="Yes"
							cancelText="No"
						>
							<Button danger disabled={tempPage.uuid === "null"}>
								删除
							</Button>
						</Popconfirm>
						<Button
							type="primary"
							onClick={() => navigateTo("/designer")}
							disabled={tempPage.uuid === "null"}
						>
							设计
						</Button>
				</div>
				<div className="relative h-full overflow-hidden bg-zinc-200 mr-2 ">
					{/* 预览窗口 */}
					<Preview />
				</div>
			</div>
			<div>
				{/* 对话框 */}
				<Modal
					title="测试数据"
					open={testDataModal}
					onOk={handleOk}
					onCancel={() => setTestDataModal(false)}
				>
					<TextArea
						defaultValue={
							// biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
							(testData = getTestData(
								tempPage.type === "PowerConsumption" ? "pw" : "de",
							))
						}
						autoSize={true}
						onBlur={(e: any) => {
							testData = e.target.value;
						}}
					/>
				</Modal>
				<Modal
					title="新建模板"
					open={newTempModal}
					onOk={createTemp}
					onCancel={() => setNewTempModal(false)}
					width={600}
				>
					<label>模板类型</label>
					<Select
						style={{ width: 120, margin: "20px 20px 10px 20px" }}
						onSelect={(e: any) => dispatch(setType(e))}
						options={getTempType()}
					/>
					<label>模板名称</label>
					<Input
						style={{ width: "200px", margin: "20px 20px 10px 20px" }}
						onChange={(e: any) => dispatch(changeTempName(e.target.value))}
					/>
				</Modal>
			</div>
		</div>
	);
};

export default TempPrint;
