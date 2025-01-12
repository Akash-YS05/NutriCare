import { ReactNode } from "react";

export const Table = ({ children, className = '', ...props }: {children: ReactNode, className?: string}) => {
    return (
      <div className="w-full overflow-auto">
        <table
          className={`w-full caption-bottom text-sm ${className}`}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  };
  
  export const TableHeader = ({ children, className = '', ...props }: {children: ReactNode, className?: string}) => {
    return (
      <thead className={`[&_tr]:border-b ${className}`} {...props}>
        {children}
      </thead>
    );
  };
  
  export const TableBody = ({ children, className = '', ...props }: {children: ReactNode, className?: string}) => {
    return <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props}>{children}</tbody>;
  };
  
  export const TableRow = ({ children, className = '', ...props }: {children: ReactNode, className?: string}) => {
    return (
      <tr
        className={`border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 ${className}`}
        {...props}
      >
        {children}
      </tr>
    );
  };
  
  export const TableCell = ({ children, className = '', ...props }: {children: ReactNode, className?: string}) => {
    return (
      <td
        className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
        {...props}
      >
        {children}
      </td>
    );
  };
  
  export const TableHead = ({ children, className = '', ...props }: {children: ReactNode, className?: string}) => {
    return (
      <th
        className={`h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 ${className}`}
        {...props}
      >
        {children}
      </th>
    );
  };