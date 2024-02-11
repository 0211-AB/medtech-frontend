function createDoc(data) {
    var dd = {
        content: [
            {
                alignment: 'justify',
                columns: [
                    {
                        image: 'rx',
                        height: 40,
                        width: 100
                    },
                    {
                        text:"Scribe.AI",
                        style:"header",
                        alignment:"right"
                    }
                ]
            },
            {
                text: '_______________________________________________________________________________________________',
            },
            {
                columns: [
                    {
                        text: [
                            { text: data?.providername?'Transcript Recorded By: ':'File Name : ', bold: true },
                            { text: `${data?.providername?data?.providername:data.file}\n` },
                            { text: 'Date And Time: ', bold: true },
                            { text: `${data.time}\n` },
                        ]
                    },
                ],
                margin: [0, 0, 0, 10]
            },
            {
                text: 'TRANSCRIPT',
                bold: true,
                margin: [0, 10, 0, 10]
            },
            data.messages,
            data.includeSummary ? {
                text: 'SUMMARY',
                bold: true,
                margin: [0, 10, 0, 10]
            } : "",
            data.includeSummary ? data.summarizedTranscript : ""
        ],
        images: {
            rx: data.url,
        },
        styles: {
            header: {
                fontSize: 25,
                bold: true
            },
        }

    }

    return dd;
}

export { createDoc }