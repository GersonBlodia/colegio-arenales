interface Props{
      children:React.ReactNode;
      className:string;
}
export const ContextCurso = ({children, className}:Props) => {
    return (
      <main className={className}>
          {children}
      </main>
    )
  }
