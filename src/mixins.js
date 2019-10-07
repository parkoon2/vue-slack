export default {
    methods: {
        handleNotification(channelId, currentChannelId, notifiCount, snapshot) {
            let lastTotal = 0;
            let index = notifiCount.findIndex(el => el.id === channelId);

            if (index !== -1) {
                if (channelId !== currentChannelId) {
                    lastTotal = notifiCount[index].total;
                    if (snapshot.numChildren() - lastTotal > 0) {
                        notifiCount[index].notifi = snapshot.numChildren() - lastTotal;
                    }
                }

                notifiCount[index].lastKnownTotal = snapshot.numChildren();
            } else {
                notifiCount.push({
                    id: channelId,
                    total: snapshot.numChildren(),
                    lastKnownTotal: snapshot.numChildren(),
                    notifi: 0
                });
            }
        },
    }
}