import {
	formatDistanceToNow as dateFnsFormatDistanceToNow,
	format,
} from "date-fns";
import { ja } from "date-fns/locale";

export function formatDistanceToNow(date: Date): string {
	return dateFnsFormatDistanceToNow(date, {
		locale: ja,
		addSuffix: true,
	});
}

export function formatDate(date: Date): string {
	return format(date, "yyyy-MM-dd");
}
