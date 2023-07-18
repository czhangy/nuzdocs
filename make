#!/bin/bash
read -p "Component Name: " name
mkdir src/components/"$name"
cat << EOT >> src/components/"$name"/"$name".tsx
import styles from "./$name.module.scss";

const $name: React.FC = () => {
    return <div className={styles[""]}></div>;
};

export default $name;
EOT
echo "@use \"@/styles/constants\";" > src/components/"$name"/"$name".module.scss