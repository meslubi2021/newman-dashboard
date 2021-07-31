import { useRouter } from "next/router";
import { inject, observer } from "mobx-react";
import RunData from "../../components/RunData";
import Header from "../../components/Header";

const RunDetails = inject("store")(
    observer((props) => {
        const router = useRouter();
        const { id } = router.query;

        const run = props.store.runs.filter((runData) => runData.id === id);

        return (
            <>
                <Header />
                {!!run.length > 0 ? <RunData run={run[0]} /> : <p>Invalid Run</p>}
            </>
        );
    })
);

export default RunDetails;
