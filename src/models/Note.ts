import NoteFormat from './NoteFormat';

export default interface Note {
  id: string;
  driveFileId?: string;
  body: string;
  tags?: Array<string>;
  format: NoteFormat;
  createdAt: Date;
  expiresAt?: Date;

}
