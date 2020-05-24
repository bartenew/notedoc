const DEFAULT_NOTE_BODY = `Hello, AsciiDoc!
~~~~~~~~~~~~~~~~
- Take notes
- Save to Google Drive
- Preview rendered notes in Edit

TIP: There are five admonition labels: Tip, Note, Important, Caution and Warning.

image::https://cdn.pixabay.com/photo/2016/02/19/11/53/pug-1210025_960_720.jpg[300,200]

Icons icon:github[] icon:google[] icon:youtube[] icon:chrome[]

*https://fontawesome.com/icons?d=gallery[Link, window="_blank"]*

Lead Paragraph.
~~~~~~~~~~~~~~~
[.lead]
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas mi sapien, convallis quis bibendum tincidunt, faucibus et purus.
Suspendisse molestie lorem a diam pulvinar, in malesuada turpis mattis.

Normal paragraph
~~~~~~~~~~~~~~~~
Curabitur est ipsum, iaculis in lectus vel, pulvinar sollicitudin sem. Suspendisse cursus arcu massa, vel posuere felis feugiat nec.
Morbi tincidunt diam sed arcu consectetur, ut facilisis leo rutrum.

_italic_ *bold* ~subscript~

.Table title
|===
|Column heading 1 |Column heading 2

|Column 1, row 1
|Column 2, row 1

|Column 1, row 2
|Column 2, row 2
|===
`
;
export { DEFAULT_NOTE_BODY };
