import { QueueWorker } from '@squareboat/nest-queue';
import { Console, Command, createSpinner } from 'nestjs-console';

@Console()
export class QueueWorkerCommand {
  
  @Command({
    command: 'queue:work <connection> [queue] [sleep]',
    description: 'Running queue worker'
  })
  async create(connection: string, queue: string = null, sleep: number = 10) {
    let options = {
      connection: connection,
      sleep: sleep
    };
    if (queue != null) options['queue'] = queue;
    await this.listenQueue({ connection: connection, sleep: sleep, queue: queue });
  }

  async listenQueue({
    connection,
    queue,
    sleep,
  }: {
    connection?: string;
    sleep?: Number;
    queue?: string;
  }) {
    const options = {};
    if (sleep) options['sleep'] = sleep;
    if (connection) options['connection'] = connection;
    if (queue) options['queue'] = queue;
    await QueueWorker.init(options).listen();
  }
}
