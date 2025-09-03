import { useEffect, useState } from "react"

export const useFilterStore=()=>{
    const [selectedCategory, setSelectedCategory] = useState<string>("Programación y desarrollo web");
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
      }, [selectedCategory]);
    return {
        setSelectedCategory:setSelectedCategory,
        loading:loading,
        selectedCategory
    }
}