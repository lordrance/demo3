import headLogo from "@/assets/head-logo.png";
import logo from "@/assets/logo.png";
import type { MenuItem } from "@/interfaces";
import { PrinterOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "../home-page";
import TempPrint from "../temp-print";
import styles from "./index.module.scss";

const items: MenuItem[] = [
	{
		label: "模板打印",
		key: "tempPrint",
		icon: <PrinterOutlined />,
	},
];

//主页布局
export default function Home() {
	const navigateTo = useNavigate();
	//收放侧边栏
	const [collapsed, setCollapsed] = useState(false);
	const logoRef = useRef<HTMLImageElement>(null);

	//当收起侧边栏
	const handleCollapse = (value: boolean) => {
		setCollapsed(value);
		if (value && logoRef.current) {
			logoRef.current.style.transform = "translateX(-200px)";
		} else if (logoRef.current) {
			logoRef.current.style.transform = "translateX(0)";
		}
	};

	//点击左侧导航
	const [selectKeys, setSelectKeys] = useState([] as string[]);
	const handleClick = ({ key }: { key: string }) => {
		navigateTo(key);
		setSelectKeys([key]);
	};

	return (
		<Layout className={styles.root}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => handleCollapse(value)}
				width={192}
				className="sider"
			>
				<img
					src={headLogo}
					className="head-logo cursor-pointer"
					onClick={() => {
						navigateTo("/home");
						setSelectKeys([]);
					}}
					ref={logoRef}
				/>
				<Menu
					theme="dark"
					mode="inline"
					items={items}
					onClick={handleClick}
					selectedKeys={selectKeys}
				/>
			</Sider>
			<Layout className="">
				<Content className="bg-white">
					<Routes>
						<Route path="" element={<HomePage />} />
						<Route path="tempPrint" element={<TempPrint />} />
					</Routes>
				</Content>
				<div className="flex justify-center bg-white">
					江苏丰尚智能科技有限公司©版权所有
					<img src={logo} className="h-[15px] absolute right-0" />
				</div>
			</Layout>
		</Layout>
	);
}
