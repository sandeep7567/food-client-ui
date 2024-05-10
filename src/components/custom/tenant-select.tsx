"use client";

import { Tenant } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect } from "react";

const TenantSelect = ({ resutrants }: { resutrants: { data: Tenant[] } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resutrantId = searchParams.get("resutrantId");

  const handleValueChange = (resutrantId: string) => {
    router.push(`/?resutrantId=${resutrantId}`);
  };

  const defaultResutrantId = resutrants.data[0].id;

  useEffect(() => {
    if (resutrants.data[0].id) {
      router.push(`/?resutrantId=${defaultResutrantId}`);
    }
  }, [defaultResutrantId, resutrants.data, router]);

  return (
    <Select
      value={resutrantId || ""}
      defaultValue={defaultResutrantId || ""}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-[180px] focus:ring-0">
        <SelectValue placeholder="Select Restaurant" />
      </SelectTrigger>
      <SelectContent>
        {resutrants.data.map((resutrant) => {
          return (
            <SelectItem value={String(resutrant.id)} key={resutrant.id}>
              {resutrant.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
