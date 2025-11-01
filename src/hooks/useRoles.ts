// src/hooks/useRoles.ts
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface RoleRow {
    id_role: number;
    role: string;
}

export function useRoles() {
    const [roles, setRoles] = useState<RoleRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchRoles() {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("Roles")
            .select("id_role, role")
            .order("id_role", { ascending: true });

        if (error) {
            console.error(error);
            setError(error.message);
        } else {
            setRoles(data as RoleRow[]);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchRoles();
    }, []);

    return { roles, loading, error };
}
