import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface TOOL {
  name: string;
  desc: string;
  icon: string;
  path: string;
}

type toolProps = {
  tool: TOOL;
};

const ToolCard = ({ tool }: toolProps) => {
  return (
    <div className="p-4 border rounded-lg">
      <Image
        src={tool.icon}
        width={150}
        height={200}
        alt={tool.name}
        className="mx-auto"
      />
      <h2 className="text-2xl font-bold mt-2">{tool.name}</h2>
      <p className="text-gray-600">{tool.desc}</p>
      <Button className="w-full cursor-pointer mt-3">
        <Link href={tool.path}>Get started</Link>
      </Button>
    </div>
  );
};

export default ToolCard;
