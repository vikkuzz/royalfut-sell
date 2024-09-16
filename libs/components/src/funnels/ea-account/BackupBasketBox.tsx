import { XIcon } from "@royalfut/icons";
import { Button } from "@royalfut/ui";

import type { FC } from "react";
import type { IBackupCodeEntity } from "@royalfut/interfaces";

const BackupBasketBox: FC<
    IBackupCodeEntity & { onRemove: (code: IBackupCodeEntity) => void }
> = ({ code, id, onRemove }) => {
    return (
        <div
            className="relative flex items-center justify-between pl-3 py-1 pr-2.5 bg-white-10 rounded-lg pointer-events-none z-[1] select-none"
            key={code}
        >
            <span className="text-white text-base font-medium mr-1 whitespace-nowrap select-none">
                {code.substring(0, 4) + " " + code.substring(4)}
            </span>
            <Button
                as="button"
                onClick={onRemove.bind(null, { code, id })}
                type="button"
                className="w-max h-max pointer-events-[all] select-none"
            >
                <XIcon className="w-4.5 h-4.5 text-white select-none" />
            </Button>
        </div>
    );
};

export default BackupBasketBox;
