import type React from "react";
import styles from "./table.module.scss";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  /** Adds alternating row backgrounds. */
  striped?: boolean;
  /** Wraps the table with border and rounded corners. */
  bordered?: boolean;
  /** Reduces cell padding. */
  compact?: boolean;
  ref?: React.Ref<HTMLTableElement>;
}

export function Table({
  striped = false,
  bordered = false,
  compact = false,
  className,
  children,
  ref,
  ...props
}: TableProps) {
  return (
    <table
      ref={ref}
      className={[
        styles.table,
        striped && styles.striped,
        bordered && styles.bordered,
        compact && styles.compact,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </table>
  );
}

/* ── Sub-components ────────────────────────────────── */

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

export function TableHeader({
  className,
  children,
  ref,
  ...props
}: TableHeaderProps) {
  return (
    <thead
      ref={ref}
      className={[styles.header, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </thead>
  );
}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

export function TableBody({
  className,
  children,
  ref,
  ...props
}: TableBodyProps) {
  return (
    <tbody
      ref={ref}
      className={[styles.body, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </tbody>
  );
}

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  ref?: React.Ref<HTMLTableSectionElement>;
}

export function TableFooter({
  className,
  children,
  ref,
  ...props
}: TableFooterProps) {
  return (
    <tfoot
      ref={ref}
      className={[styles.footer, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </tfoot>
  );
}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  ref?: React.Ref<HTMLTableRowElement>;
}

export function TableRow({
  className,
  children,
  ref,
  ...props
}: TableRowProps) {
  return (
    <tr ref={ref} className={className} {...props}>
      {children}
    </tr>
  );
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  ref?: React.Ref<HTMLTableCellElement>;
}

export function TableHead({
  className,
  children,
  ref,
  ...props
}: TableHeadProps) {
  return (
    <th ref={ref} className={className} {...props}>
      {children}
    </th>
  );
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  ref?: React.Ref<HTMLTableCellElement>;
}

export function TableCell({
  className,
  children,
  ref,
  ...props
}: TableCellProps) {
  return (
    <td ref={ref} className={className} {...props}>
      {children}
    </td>
  );
}

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  ref?: React.Ref<HTMLTableCaptionElement>;
}

export function TableCaption({
  className,
  children,
  ref,
  ...props
}: TableCaptionProps) {
  return (
    <caption
      ref={ref}
      className={[styles.caption, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </caption>
  );
}
