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
                        text: 'Scribe.ai',
                        style: 'header',
                        alignment: 'right'
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
                            { text: 'Transcript Recorded By: ', bold: true },
                            { text: `${data.providername}\n` },
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
        footer: {
            text: `Copyright : Scribe.ai `,
            alignment: 'right',
            margin: [0, 0, 50, 0]
        },
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