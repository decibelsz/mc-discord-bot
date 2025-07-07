import { Module } from '@nestjs/common';
import { ReadyEvent } from './ready.event';
import { MessageEvent } from './message.event';
import { ButtonEvent } from './button.event';

@Module({
  providers: [ReadyEvent, MessageEvent, ButtonEvent],
})
export class EventsModule {} 