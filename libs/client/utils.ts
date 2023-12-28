/** 클래스네임 가져와서 합쳐주는 함수
 * [1, 2, 3].join("") => "123"
 * [1, 2, 3].join("/") => "1/2/3"
 */
export function cls(...classname: string[]) {
  return classname.join(" ");
}

/** UTC 시간 한국 시간으로 표시하는 함수
 */
export function utcToKoreanTime(utcDateAndTimeString: Date | undefined) {
  const utcDate = new Date(`${utcDateAndTimeString}`);
  return utcDate.toLocaleString("kst").slice(0, -3);
}

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
import "dayjs/locale/ko";
import { chatMessage } from "@/pages/chats/[id]";
dayjs.locale("ko");

export function getTimeInterval(dataCreatedTime: Date | string) {
  const currentTime = dayjs(new Date());
  const timeInterval = dayjs.duration(currentTime.diff(dataCreatedTime));

  const yearInterval: number = parseInt(timeInterval.format("Y"));
  const monthInterval: number = parseInt(timeInterval.format("M"));
  const dateInterval: number = parseInt(timeInterval.format("D"));
  const hourInterval: number = parseInt(timeInterval.format("H"));
  const minuteInterval: number = parseInt(timeInterval.format("m"));
  const secondInterval: number = parseInt(timeInterval.format("s"));

  if (yearInterval > 0) {
    return `${yearInterval}년 전`;
  } else if (monthInterval > 0) {
    return `${monthInterval}개월 전`;
  } else if (dateInterval > 0) {
    return `${dateInterval}일 전`;
  } else if (hourInterval > 0) {
    return `${hourInterval}시간 전`;
  } else if (minuteInterval > 0) {
    return `${minuteInterval}분 전`;
  } else if (secondInterval > 0) {
    return `${secondInterval}초 전`;
  }
}

export function getMessageTime(dataCreatedTime: Date | string) {
  const createdTime = dayjs(dataCreatedTime);

  const hour: number = createdTime.hour();
  const minute: number = createdTime.minute();

  if (hour > 12) {
    return `오후 ${hour - 12}:${minute}`;
  } else if (hour === 0) {
    return `오전 12:${minute}`;
  } else {
    return `오전 ${hour}:${minute}`;
  }
}

export function getReservationTime(dataCreatedTime: Date | string) {
  const createdTime = dayjs(dataCreatedTime);
  const month: number = createdTime.month();
  const date: number = createdTime.date();
  const day: string = createdTime.format("dd");
  const hour: number = createdTime.hour();
  const minute: number = createdTime.minute();

  if (hour > 12) {
    return `${month}월 ${date}일 (${day}) 오후 ${hour - 12}:${minute}`;
  } else if (hour === 0) {
    return `${month}월 ${date}일 (${day}) 오전 12:${minute}`;
  } else {
    return `${month}월 ${date}일 (${day}) 오전 ${hour}:${minute}`;
  }
}

interface divideDateSection {
  [key: string]: chatMessage[];
}

export function divideDate(chatList: chatMessage[]) {
  const sections: divideDateSection = {};

  chatList.forEach((chat) => {
    const chatCreateDate = dayjs(chat.created);
    const year: number = chatCreateDate.year();
    const month: number = chatCreateDate.month();
    const date: number = chatCreateDate.date();
    const formattedChatCreateDate = `${year}년 ${month}월 ${date}일`;

    if (sections[formattedChatCreateDate]) {
      sections[formattedChatCreateDate].push(chat);
    } else {
      sections[formattedChatCreateDate] = [chat];
    }
  });
  return sections;
}
