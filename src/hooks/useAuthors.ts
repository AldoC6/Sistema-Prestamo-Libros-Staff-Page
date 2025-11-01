import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface AuthorRow {
    id_autor: number;
    first_name: string;
    last_name: string;
}

export function useAuthors() {
    const [authors, setAuthors] = useState<AuthorRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchAuthors() {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("Autores")
            .select(`
                id_autor,
                first_name,
                last_name
            `)
            .order("added_at", { ascending: false });

        if (error) {
            console.error(error);
            setError(error.message);
        } else {
            setAuthors(data as AuthorRow[]);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchAuthors();
    }, []);

    return { authors, loading, error, refetch: fetchAuthors };
}
