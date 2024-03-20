import { PickerLocale } from 'antd/es/date-picker/generatePicker';
import ruRU from 'antd/lib/calendar/locale/ru_RU';

export const appLocale: PickerLocale = {
    lang: {
        ...ruRU.lang,
        shortWeekDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        shortMonths: [
            'Янв',
            'Фев',
            'Мар',
            'Апр',
            'Май',
            'Июн',
            'Июл',
            'Авг',
            'Сен',
            'Окт ',
            'Ноя',
            'Дек',
        ],
    },
    timePickerLocale: {
        ...ruRU.timePickerLocale,
        placeholder: 'Select time',
    },
};
