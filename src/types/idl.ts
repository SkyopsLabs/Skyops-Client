/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/sol_rewards.json`.
 */
export type SolRewards = {
  address: "6Wqb3Lhu1ggDARu7dnyaQ6v819zh5g4QT5kZ2cZcVk3t";
  metadata: {
    name: "solRewards";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "claimRewards";
      discriminator: [4, 144, 132, 71, 116, 23, 151, 80];
      accounts: [
        {
          name: "user";
          writable: true;
          signer: true;
        },
        {
          name: "state";
          writable: true;
        },
        {
          name: "userData";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [117, 115, 101, 114];
              },
              {
                kind: "account";
                path: "user";
              },
            ];
          };
        },
        {
          name: "vault";
          writable: true;
        },
        {
          name: "userToken";
          writable: true;
        },
        {
          name: "mint";
          writable: true;
        },
        {
          name: "vaultAuth";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116, 95, 97, 117, 116, 104];
              },
            ];
          };
        },
        {
          name: "instructionsSysvar";
          address: "Sysvar1nstructions1111111111111111111111111";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "points";
          type: "u64";
        },
      ];
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [
        {
          name: "state";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [115, 116, 97, 116, 101];
              },
            ];
          };
        },
        {
          name: "owner";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "tokenPerPoint";
          type: "u64";
        },
      ];
    },
    {
      name: "transferOwnership";
      discriminator: [65, 177, 215, 73, 53, 45, 99, 47];
      accounts: [
        {
          name: "state";
          writable: true;
        },
        {
          name: "owner";
          signer: true;
          relations: ["state"];
        },
      ];
      args: [
        {
          name: "newOwner";
          type: "pubkey";
        },
      ];
    },
    {
      name: "updateTokenPerPoint";
      discriminator: [82, 65, 24, 73, 229, 144, 133, 89];
      accounts: [
        {
          name: "state";
          writable: true;
        },
        {
          name: "owner";
          signer: true;
          relations: ["state"];
        },
      ];
      args: [
        {
          name: "newRate";
          type: "u64";
        },
      ];
    },
  ];
  accounts: [
    {
      name: "state";
      discriminator: [216, 146, 107, 94, 104, 75, 182, 177];
    },
    {
      name: "userClaimData";
      discriminator: [214, 233, 149, 224, 175, 229, 124, 134];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "unauthorized";
      msg: "Unauthorized signer.";
    },
    {
      code: 6001;
      name: "cooldownNotMet";
      msg: "You can only claim once per week.";
    },
    {
      code: 6002;
      name: "overflow";
      msg: "Overflow in math operation.";
    },
    {
      code: 6003;
      name: "ed25519VerifyFailed";
      msg: "Ed25519 signature verification failed.";
    },
  ];
  types: [
    {
      name: "state";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "pubkey";
          },
          {
            name: "tokenPerPoint";
            type: "u64";
          },
          {
            name: "totalClaimed";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "userClaimData";
      type: {
        kind: "struct";
        fields: [
          {
            name: "lastClaimedAt";
            type: "i64";
          },
          {
            name: "totalClaimed";
            type: "u64";
          },
        ];
      };
    },
  ];
};

export const idl = {
  address: "6Wqb3Lhu1ggDARu7dnyaQ6v819zh5g4QT5kZ2cZcVk3t",
  metadata: {
    name: "sol_rewards",
    version: "0.1.0",
    spec: "0.1.0",
    description: "Created with Anchor",
  },
  instructions: [
    {
      name: "claim_rewards",
      discriminator: [4, 144, 132, 71, 116, 23, 151, 80],
      accounts: [
        {
          name: "user",
          writable: true,
          signer: true,
        },
        {
          name: "state",
          writable: true,
        },
        {
          name: "user_data",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [117, 115, 101, 114],
              },
              {
                kind: "account",
                path: "user",
              },
            ],
          },
        },
        {
          name: "vault",
          writable: true,
        },
        {
          name: "user_token",
          writable: true,
        },
        {
          name: "mint",
          writable: true,
        },
        {
          name: "vault_auth",
          pda: {
            seeds: [
              {
                kind: "const",
                value: [118, 97, 117, 108, 116, 95, 97, 117, 116, 104],
              },
            ],
          },
        },
        {
          name: "instructions_sysvar",
          address: "Sysvar1nstructions1111111111111111111111111",
        },
        {
          name: "token_program",
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "points",
          type: "u64",
        },
      ],
    },
    {
      name: "initialize",
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237],
      accounts: [
        {
          name: "state",
          writable: true,
          pda: {
            seeds: [
              {
                kind: "const",
                value: [115, 116, 97, 116, 101],
              },
            ],
          },
        },
        {
          name: "owner",
          writable: true,
          signer: true,
        },
        {
          name: "system_program",
          address: "11111111111111111111111111111111",
        },
      ],
      args: [
        {
          name: "token_per_point",
          type: "u64",
        },
      ],
    },
    {
      name: "transfer_ownership",
      discriminator: [65, 177, 215, 73, 53, 45, 99, 47],
      accounts: [
        {
          name: "state",
          writable: true,
        },
        {
          name: "owner",
          signer: true,
          relations: ["state"],
        },
      ],
      args: [
        {
          name: "new_owner",
          type: "pubkey",
        },
      ],
    },
    {
      name: "update_token_per_point",
      discriminator: [82, 65, 24, 73, 229, 144, 133, 89],
      accounts: [
        {
          name: "state",
          writable: true,
        },
        {
          name: "owner",
          signer: true,
          relations: ["state"],
        },
      ],
      args: [
        {
          name: "new_rate",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "State",
      discriminator: [216, 146, 107, 94, 104, 75, 182, 177],
    },
    {
      name: "UserClaimData",
      discriminator: [214, 233, 149, 224, 175, 229, 124, 134],
    },
  ],
  errors: [
    {
      code: 6000,
      name: "Unauthorized",
      msg: "Unauthorized signer.",
    },
    {
      code: 6001,
      name: "CooldownNotMet",
      msg: "You can only claim once per week.",
    },
    {
      code: 6002,
      name: "Overflow",
      msg: "Overflow in math operation.",
    },
    {
      code: 6003,
      name: "Ed25519VerifyFailed",
      msg: "Ed25519 signature verification failed.",
    },
  ],
  types: [
    {
      name: "State",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "pubkey",
          },
          {
            name: "token_per_point",
            type: "u64",
          },
          {
            name: "total_claimed",
            type: "u64",
          },
        ],
      },
    },
    {
      name: "UserClaimData",
      type: {
        kind: "struct",
        fields: [
          {
            name: "last_claimed_at",
            type: "i64",
          },
          {
            name: "total_claimed",
            type: "u64",
          },
        ],
      },
    },
  ],
};
