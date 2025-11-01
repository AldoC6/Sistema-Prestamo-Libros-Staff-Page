import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface GenreRow {
    id_genero: number;
    genero: string;
}

export function useGenres() {
    const [genres, setGenres] = useState<GenreRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchGenres() {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
            .from("Generos")
            .select(`
                id_genero,
                genero
            `)
            .order("id_genero", { ascending: true });

        if (error) {
            console.error(error);
            setError(error.message);
        } else {
            setGenres(data as GenreRow[]);
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchGenres();
    }, []);

    return { genres, loading, error, refetch: fetchGenres };
}
