import type { Config } from 'jest';

const config: Config = { 
    transform: {
        '^.+\\.ts$': [
                'ts-jest',
                {
                    useESM: true,
                },
            ],
    },
    extensionsToTreatAsEsm: ['.ts'],
    testEnvironment: 'node'
}

export default config;

