export default class Note {
  readonly id: string;
  driveFileId?: string | null;
  isSynced?: boolean;
  body: string;
  tags?: Array<string>;
  createdAt: Date;
  expiresAt?: Date;

  constructor(
    $id: string,
    $body: string,
    $createdAt: Date,
  ) {
    this.id = $id;
    this.body = $body;
    this.createdAt = $createdAt;
    this.isSynced = false;
  }
}
