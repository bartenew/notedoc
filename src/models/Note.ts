import NoteFormat from './NoteFormat';

export default class Note {
  readonly id: string;
  driveFileId?: string;
  isSynced?: boolean;
  body: string;
  tags?: Array<string>;
  format: NoteFormat;
  createdAt: Date;
  expiresAt?: Date;

  constructor(
    $id: string,
    $body: string,
    $format: NoteFormat,
    $createdAt: Date,
  ) {
    this.id = $id;
    this.body = $body;
    this.format = $format;
    this.createdAt = $createdAt;
    this.isSynced = false;
  }
}
