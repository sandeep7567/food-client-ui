"use client";

import { Tenant } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter } from "next/navigation";

const TenantSelect = ({ resutrants }: { resutrants: { data: Tenant[] } }) => {
  const router = useRouter();

  const handleValueChange = (resutrantId: string) => {
    router.push(`/?resutrantId=${resutrantId}`);
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px] focus:ring-0">
        <SelectValue placeholder="Select Restaurant" />
      </SelectTrigger>
      <SelectContent>
        {resutrants.data.map((resutrant) => {
          return (
            <SelectItem value={resutrant.id} key={resutrant.id}>
              {resutrant.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
