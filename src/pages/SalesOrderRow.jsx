import Badge from "@/components/ui/Badge";
export default function SalesOrderRow() {
    return (
        <tr className="transition-colors hover:bg-[#fafafd]">
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                INV-2026-0231
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                Baut M8 × 40mm
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                500
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                500 / 500
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                0 / 0
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap">
                <Badge variant="success">Sudah</Badge>
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap">
                <Badge variant="success">Ada</Badge>
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                1 Jam 3 menit
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                1 Jam
            </td>
        </tr>
    )
}