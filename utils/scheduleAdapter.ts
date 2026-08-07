/**
 * Translates between the calendar UI and the API's event shape.
 *
 * The Django serializer in academics/calendar/serializers.py speaks Syncfusion's
 * vocabulary verbatim - `Subject`, `StartTime`, `EndTime`, `IsAllDay`,
 * `StartTimeZone`, `EndTimeZone`, `Id`. Those field names are the wire format
 * and they are shared with the mobile client, so dropping Syncfusion from the
 * frontend must not change them.
 *
 * Everything Syncfusion-shaped is therefore confined to this file. The calendar
 * component works in react-big-calendar's own `{title, start, end, allDay}`
 * terms, and these two functions convert at the boundary. If the API is ever
 * renamed to snake_case, this is the only file that changes.
 */

/** An event as the API stores it. */
export interface ApiEvent {
   Id?: number | string;
   Subject: string;
   StartTime: string | Date;
   EndTime: string | Date;
   IsAllDay?: boolean;
   StartTimeZone?: string | null;
   EndTimeZone?: string | null;
   Description?: string;
   [key: string]: unknown;
}

/** An event as react-big-calendar wants it. */
export interface CalendarEvent {
   id?: number | string;
   title: string;
   start: Date;
   end: Date;
   allDay: boolean;
   /** The untouched API record, so a round trip preserves unknown fields. */
   raw: ApiEvent;
}

const toDate = (value: string | Date | undefined): Date =>
   value instanceof Date ? value : new Date(value ?? Date.now());

export function toCalendarEvent(record: ApiEvent): CalendarEvent {
   return {
      id: record.Id,
      title: record.Subject ?? "(no title)",
      start: toDate(record.StartTime),
      end: toDate(record.EndTime),
      allDay: Boolean(record.IsAllDay),
      raw: record,
   };
}

export function toCalendarEvents(records: ApiEvent[] | undefined): CalendarEvent[] {
   if (!Array.isArray(records)) return [];
   return records.map(toCalendarEvent);
}

/**
 * Back to the API shape. Spreads `raw` first so fields this UI never displays -
 * StartTimeZone, RecurrenceRule, anything added server-side later - survive an
 * edit instead of being silently dropped.
 */
export function toApiEvent(event: {
   id?: number | string;
   title?: string;
   start: Date;
   end: Date;
   allDay?: boolean;
   raw?: ApiEvent;
}): ApiEvent {
   return {
      ...(event.raw ?? {}),
      ...(event.id !== undefined ? { Id: event.id } : {}),
      Subject: event.title ?? event.raw?.Subject ?? "",
      StartTime: event.start.toISOString(),
      EndTime: event.end.toISOString(),
      IsAllDay: Boolean(event.allDay),
   };
}
