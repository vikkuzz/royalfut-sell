/* eslint-disable @typescript-eslint/naming-convention */

import type { ITrustpilotReviewEntity } from "../../reviews.interface";

export namespace Reviews {
    export namespace Trustpilot {
        export namespace GET {
            export namespace Response {
                export type Body = Array<ITrustpilotReviewEntity>;
            }
        }
    }
}
