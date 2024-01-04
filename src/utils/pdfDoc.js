function createDoc(data) {
    var dd = {
        content: [
            {
                alignment: 'justify',
                columns: [
                    {
                        image: 'rx',
                        width: 40,
                        height: 40
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
                            { text: 'Patient Name: ', bold: true },
                            { text: `${data.name}\n` },
                            { text: 'Patient Email ID: ', bold: true },
                            { text: `${data.email}\n\n` },
                            { text: 'Provider Name: ', bold: true },
                            { text: `${data.providername}\n` },
                            { text: 'Date And Time: ', bold: true },
                            { text: `${data.time}\n` },
                        ]
                    },
                ],
                margin: [0, 0, 0, 20]
            },
            {
                text: 'TRANSCRIPT',
                bold: true,
                margin: [0, 10, 0, 10]
            },
            {
                ul: data.messages
            }
        ],
        footer: {
            text: `Copyright : Scribe.ai `,
            alignment: 'right',
            margin: [0, 0, 50, 0]
        },
        images: {
            rx: 'https://res.cloudinary.com/dwngj1n6n/image/upload/v1703837023/Group_1000001807_vafkx3.png',
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