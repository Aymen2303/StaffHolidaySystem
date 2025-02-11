"use client";

import { Sidebar } from "flowbite-react";
import { HiChartPie } from "react-icons/hi";
import { VscNewFile } from "react-icons/vsc";
import { FaListUl } from "react-icons/fa6";

const SideBar = () => {
  return (
    <Sidebar aria-label="Default sidebar example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Tableau
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={VscNewFile} labelColor="dark">
            Nouveau Titre de congé
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FaListUl} >
            Liste des employés
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
