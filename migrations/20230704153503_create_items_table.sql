CREATE TABLE items(
	id uuid NOT NULL,
	PRIMARY KEY (id),

	content TEXT NOT NULL,
	exposure TEXT NOT NULL DEFAULT E'never',
	language TEXT NOT NULL,
	private BOOLEAN NOT NULL DEFAULT false,
	password BOOLEAN NOT NULL DEFAULT false,
	created_at timestamptz NOT NULL,
	expire_at timestamptz
);
