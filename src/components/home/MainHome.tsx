interface Props {
    className: string;
    children: React.ReactNode;
}
export const MainHome = ({children,className}:Props) => {
return (
<section className={className}>
        {children}
</section>
)
}
